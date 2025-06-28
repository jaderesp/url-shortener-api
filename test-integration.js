const axios = require('axios');

const API_BASE = 'http://localhost:3001';

class IntegrationTest {
  constructor() {
    this.authToken = null;
    this.testUrls = [];
    this.testEmail = `test${Date.now()}@example.com`;
    this.testPassword = '123456';
  }

  async run() {
    console.log('🧪 Iniciando testes de integração...\n');

    try {
      await this.testHealthCheck();
      await this.testAuthentication();
      await this.testUrlShortening();
      await this.testProtectedRoutes();
      await this.testUrlManagement();
      await this.testUrlRedirection();

      console.log('\n🎉 Todos os testes de integração passaram!');
    } catch (error) {
      console.error('\n❌ Teste falhou:', error.message);
      if (error.response?.data) {
        console.error('📋 Detalhes:', error.response.data);
      }
      process.exit(1);
    }
  }

  async testHealthCheck() {
    console.log('1️⃣ Testando Health Check...');
    
    const response = await axios.get(`${API_BASE}/test`);
    
    if (response.status !== 200) {
      throw new Error(`Health check falhou: ${response.status}`);
    }
    
    if (!response.data.message || response.data.message !== 'API funcionando!') {
      throw new Error('Resposta de health check inválida');
    }
    
    console.log('✅ Health Check: OK');
  }

  async testAuthentication() {
    console.log('\n2️⃣ Testando Autenticação...');
    
    // Teste de registro
    console.log('   📝 Registrando usuário...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      email: this.testEmail,
      password: this.testPassword
    });
    
    if (registerResponse.status !== 201) {
      throw new Error(`Registro falhou: ${registerResponse.status}`);
    }
    
    if (!registerResponse.data.access_token) {
      throw new Error('Token não retornado no registro');
    }
    
    this.authToken = registerResponse.data.access_token;
    console.log('   ✅ Registro: OK');
    
    // Teste de login
    console.log('   🔐 Testando login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: this.testEmail,
      password: this.testPassword
    });
    
    if (loginResponse.status !== 200) {
      throw new Error(`Login falhou: ${loginResponse.status}`);
    }
    
    if (!loginResponse.data.access_token) {
      throw new Error('Token não retornado no login');
    }
    
    console.log('   ✅ Login: OK');
    
    // Teste de credenciais inválidas
    console.log('   ❌ Testando credenciais inválidas...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: this.testEmail,
        password: 'senha_errada'
      });
      throw new Error('Login deveria ter falhado com senha errada');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('   ✅ Credenciais inválidas: OK');
      } else {
        throw new Error('Teste de credenciais inválidas falhou');
      }
    }
  }

  async testUrlShortening() {
    console.log('\n3️⃣ Testando Encurtamento de URLs...');
    
    // Teste sem autenticação
    console.log('   🔗 Criando URL sem autenticação...');
    const shortResponse1 = await axios.post(`${API_BASE}/shorten`, {
      url: 'https://www.google.com'
    });
    
    if (shortResponse1.status !== 201) {
      throw new Error(`Encurtamento sem auth falhou: ${shortResponse1.status}`);
    }
    
    if (!shortResponse1.data.shortUrl) {
      throw new Error('URL encurtada não retornada');
    }
    
    this.testUrls.push(shortResponse1.data.shortUrl);
    console.log('   ✅ URL sem auth: OK');
    
    // Teste com autenticação
    console.log('   🔗 Criando URL com autenticação...');
    const shortResponse2 = await axios.post(`${API_BASE}/shorten`, {
      url: 'https://www.github.com'
    }, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    });
    
    if (shortResponse2.status !== 201) {
      throw new Error(`Encurtamento com auth falhou: ${shortResponse2.status}`);
    }
    
    this.testUrls.push(shortResponse2.data.shortUrl);
    console.log('   ✅ URL com auth: OK');
    
    // Teste de URL inválida
    console.log('   ❌ Testando URL inválida...');
    try {
      await axios.post(`${API_BASE}/shorten`, {
        url: 'url_invalida'
      });
      throw new Error('Encurtamento deveria ter falhado com URL inválida');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('   ✅ URL inválida: OK');
      } else {
        throw new Error('Teste de URL inválida falhou');
      }
    }
  }

  async testProtectedRoutes() {
    console.log('\n4️⃣ Testando Rotas Protegidas...');
    
    // Teste sem token
    console.log('   🚫 Testando acesso sem token...');
    try {
      await axios.get(`${API_BASE}/me/short-urls`);
      throw new Error('Acesso deveria ter sido negado sem token');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('   ✅ Acesso negado sem token: OK');
      } else {
        throw new Error('Teste de acesso sem token falhou');
      }
    }
    
    // Teste com token válido
    console.log('   ✅ Testando acesso com token...');
    const protectedResponse = await axios.get(`${API_BASE}/me/short-urls`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    });
    
    if (protectedResponse.status !== 200) {
      throw new Error(`Acesso protegido falhou: ${protectedResponse.status}`);
    }
    
    if (!Array.isArray(protectedResponse.data)) {
      throw new Error('Resposta não é um array');
    }
    
    console.log('   ✅ Acesso com token: OK');
  }

  async testUrlManagement() {
    console.log('\n5️⃣ Testando Gerenciamento de URLs...');
    
    // Primeiro, vamos listar as URLs do usuário
    const listResponse = await axios.get(`${API_BASE}/me/short-urls`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    });
    
    if (listResponse.data.length === 0) {
      console.log('   ⚠️  Nenhuma URL para testar gerenciamento');
      return;
    }
    
    const urlToUpdate = listResponse.data[0];
    
    // Teste de atualização
    console.log('   ✏️  Testando atualização de URL...');
    const updateResponse = await axios.patch(`${API_BASE}/me/short-urls/${urlToUpdate.id}`, {
      url: 'https://www.updated-example.com'
    }, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    });
    
    if (updateResponse.status !== 200) {
      throw new Error(`Atualização falhou: ${updateResponse.status}`);
    }
    
    console.log('   ✅ Atualização: OK');
    
    // Teste de exclusão
    console.log('   🗑️  Testando exclusão de URL...');
    const deleteResponse = await axios.delete(`${API_BASE}/me/short-urls/${urlToUpdate.id}`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    });
    
    if (deleteResponse.status !== 200) {
      throw new Error(`Exclusão falhou: ${deleteResponse.status}`);
    }
    
    console.log('   ✅ Exclusão: OK');
  }

  async testUrlRedirection() {
    console.log('\n6️⃣ Testando Redirecionamento...');
    
    if (this.testUrls.length === 0) {
      console.log('   ⚠️  Nenhuma URL para testar redirecionamento');
      return;
    }
    
    const testUrl = this.testUrls[0];
    const shortCode = testUrl.split('/u/')[1];
    
    // Teste de redirecionamento
    console.log('   🔄 Testando redirecionamento...');
    try {
      const redirectResponse = await axios.get(`${API_BASE}/u/${shortCode}`, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
      });
      
      if (redirectResponse.status !== 302) {
        throw new Error(`Redirecionamento falhou: ${redirectResponse.status}`);
      }
      
      console.log('   ✅ Redirecionamento: OK');
    } catch (error) {
      if (error.response?.status === 302) {
        console.log('   ✅ Redirecionamento: OK');
      } else {
        throw new Error('Teste de redirecionamento falhou');
      }
    }
    
    // Teste de código inválido
    console.log('   ❌ Testando código inválido...');
    try {
      await axios.get(`${API_BASE}/u/codigo_invalido`);
      throw new Error('Redirecionamento deveria ter falhado com código inválido');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('   ✅ Código inválido: OK');
      } else {
        throw new Error('Teste de código inválido falhou');
      }
    }
  }
}

// Executar os testes
const test = new IntegrationTest();
test.run().catch(console.error); 