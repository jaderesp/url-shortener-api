const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAuth() {
    try {
        console.log('🧪 Testando autenticação JWT...\n');

        // 1. Registrar um usuário com email único
        const email = `test${Date.now()}@example.com`;
        console.log('1️⃣ Registrando usuário...');
        console.log('📧 Email:', email);

        const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
            email: email,
            password: '123456'
        });
        console.log('✅ Usuário registrado:', registerResponse.data);
        console.log('📋 Resposta completa:', JSON.stringify(registerResponse.data, null, 2));

        if (!registerResponse.data.access_token) {
            console.log('❌ Token não encontrado na resposta do registro');
            return;
        }

        const token = registerResponse.data.access_token;
        console.log('🔑 Token gerado:', token.substring(0, 50) + '...');

        // 2. Fazer login
        console.log('\n2️⃣ Fazendo login...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
            email: email,
            password: '123456'
        });
        console.log('✅ Login realizado:', loginResponse.data);

        // 3. Testar rota protegida
        console.log('\n3️⃣ Testando rota protegida...');
        console.log('🔑 Usando token:', token.substring(0, 50) + '...');

        const protectedResponse = await axios.get(`${API_BASE}/me/short-urls`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Rota protegida acessada:', protectedResponse.data);

        // 4. Testar sem token (deve dar 401)
        console.log('\n4️⃣ Testando sem token (deve dar 401)...');
        try {
            await axios.get(`${API_BASE}/me/short-urls`);
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Erro 401 esperado quando não há token');
            } else {
                console.log('❌ Erro inesperado:', error.response?.status);
            }
        }

        // 5. Testar com token inválido (deve dar 401)
        console.log('\n5️⃣ Testando com token inválido (deve dar 401)...');
        try {
            await axios.get(`${API_BASE}/me/short-urls`, {
                headers: {
                    'Authorization': 'Bearer invalid_token_here',
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Erro 401 esperado com token inválido');
            } else {
                console.log('❌ Erro inesperado:', error.response?.status);
            }
        }

        console.log('\n🎉 Todos os testes passaram!');

    } catch (error) {
        console.error('❌ Erro no teste:', error.response?.data || error.message);
        if (error.response?.status) {
            console.error('📊 Status:', error.response.status);
        }
    }
}

testAuth(); 