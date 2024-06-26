function gravar() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (name && email) {
        let dados = {
            name: name,
            email: email
        };

        fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Cliente gravado:', data);
            limpar(); // Limpa o formulário após gravar com sucesso
            carregarDados(); // Recarrega os dados após gravar
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error.message);
            alert('Erro ao gravar cliente. Verifique o console para mais detalhes.');
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function limpar() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function carregarDados() {
    fetch('http://localhost:3000/customers')
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.json();
    })
    .then(data => {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        data.forEach(cliente => {
            let tr = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = cliente.id; // Ajustado para 'id'
            tr.appendChild(tdId);

            let tdName = document.createElement('td');
            tdName.textContent = cliente.name; // Ajustado para 'name'
            tr.appendChild(tdName);

            let tdEmail = document.createElement('td');
            tdEmail.textContent = cliente.email; // Ajustado para 'email'
            tr.appendChild(tdEmail);

            let tdAcao = document.createElement('td');
            let buttonExcluir = document.createElement('button');
            buttonExcluir.textContent = 'Excluir';
            buttonExcluir.onclick = function() {
                excluir(cliente.id); // Ajustado para 'id'
            };
            tdAcao.appendChild(buttonExcluir);
            tr.appendChild(tdAcao);

            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados da API:', error.message);
        alert('Erro ao carregar dados da API. Verifique o console para mais detalhes.');
    });
}

function excluir(id) {
    fetch(`http://localhost:3000/customers/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        carregarDados();
    })
    .catch(error => {
        console.error('Erro ao excluir cliente:', error.message);
        alert('Erro ao excluir cliente. Verifique o console para mais detalhes.');
    });
}
