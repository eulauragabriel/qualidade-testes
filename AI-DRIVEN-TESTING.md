# Guia: Como Usar IA para Derivação de Casos de Teste

## 📌 Visão Geral

Este documento fornece instruções práticas sobre como usar assistentes de IA (como GitHub Copilot, ChatGPT, Claude) para:
1. Analisar código e identificar cenários de teste
2. Gerar casos de teste combinatórios (Pairwise)
3. Otimizar cobertura de testes
4. Identificar edge cases e boundary values

---

## 🤖 Prompts Efetivos para IA

### Prompt 1: Análise de Cenários Pairwise

```
Analisar a seguinte função TypeScript e gerar uma matriz de testes Pairwise:

[INSERIR CÓDIGO DA FUNÇÃO]

Parâmetros e valores possíveis:
- [PARÂMETRO 1]: [lista de valores]
- [PARÂMETRO 2]: [lista de valores]
- [PARÂMETRO 3]: [lista de valores]

Gere:
1. Matriz de pairwise reduzida (máximo 50% das combinações totais)
2. Casos de teste em Jest/TypeScript
3. Explicação de por que cada caso é importante
```

**Exemplo Prático:**

```
Analisar esta função TypeScript:

function createUser(name: string, email: string, age: number): User {
  validateName(name);
  validateEmail(email);
  validateAge(age);
  
  if (findByEmail(email)) {
    throw new Error('Email já existe');
  }
  
  return { id: uuid(), name, email, age, status: 'active' };
}

Parâmetros:
- name: [válido, inválido, vazio, muito_longo]
- email: [válido, inválido, existente, malformado]
- age: [válido (18-120), muito_jovem, muito_velho, não_inteiro]

Gere matriz de Pairwise Testing com no máximo 8 casos.
```

### Prompt 2: Identificação de Edge Cases

```
Para a função abaixo, identifique e gere testes para todos os edge cases:

[INSERIR CÓDIGO]

Considere:
1. Boundary values (mínimo, máximo, +1, -1)
2. Valores nulos/undefined
3. Strings vazias e com espaços
4. Arrays vazios
5. Números negativos/zero
6. Estados inválidos
7. Condições de corrida (se aplicável)
8. Efeitos colaterais

Formato: Teste Jest com descrição.
```

### Prompt 3: Análise de Complexidade e Refatoração

```
Analise a complexidade ciclomática desta função:

[INSERIR CÓDIGO]

Tarefas:
1. Calcular CC manualmente
2. Identificar branches críticas
3. Sugerir refatoração para reduzir CC
4. Gerar testes para novos métodos refatorados
5. Comparar CC antes e depois
```

### Prompt 4: Geração de Suite de Testes Completa

```
Gere uma suite de testes completa para a seguinte classe:

[INSERIR CÓDIGO DA CLASSE]

Incluir:
1. Testes CRUD básicos
2. Validação de entradas
3. Casos de erro
4. Casos de sucesso
5. Edge cases
6. Testes de integração
7. Testes com Pairwise

Usar Jest e TypeScript.
```

---

## 🎯 Fluxo de Trabalho: IA + Testes

### Passo 1: Análise Inicial
```bash
1. Copiar função para IA
2. Pedir: "Analise esta função e liste todos os parâmetros e possíveis valores"
3. IA retorna: Tabela de parâmetros
```

### Passo 2: Matriz de Pairwise
```bash
1. Usar tabela de IA
2. Pedir: "Gere matriz de pairwise com máximo X casos"
3. IA retorna: Matriz reduzida
```

### Passo 3: Geração de Testes
```bash
1. Usar matriz
2. Pedir: "Converta esta matriz em testes Jest"
3. IA retorna: Testes prontos para usar
```

### Passo 4: Validação
```bash
1. Revisar testes
2. Executar: npm test
3. Iterar se necessário
```

---

## 📊 Exemplo Prático Completo

### Cenário: Função de Validação de Usuário

#### Código Original
```typescript
function validateUser(user: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!user.name || typeof user.name !== 'string' || user.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (!Number.isInteger(user.age) || user.age < 18 || user.age > 120) {
    errors.push('Age must be between 18 and 120');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

#### Prompt para IA
```
Gere testes Pairwise para esta função de validação:

[INSERIR CÓDIGO ACIMA]

Parâmetros e valores:
- name: [válido, inválido, vazio, null, undefined]
- email: [válido, sem @, vazio, null]
- age: [válido, muito_jovem, muito_velho, não_inteiro, null]

Gere matriz com máximo 8 casos de teste, depois converta em Jest.
```

#### Resposta Esperada da IA

**Matriz de Pairwise:**
```
Caso 1: name=válido, email=válido, age=válido → ✅ valid: true
Caso 2: name=inválido, email=válido, age=válido → ❌ errors: [Name...]
Caso 3: name=válido, email=inválido, age=válido → ❌ errors: [Email...]
Caso 4: name=válido, email=válido, age=inválido → ❌ errors: [Age...]
Caso 5: name=vazio, email=inválido, age=válido → ❌ errors: [Name, Email]
Caso 6: name=null, email=válido, age=inválido → ❌ errors: [Name, Age]
Caso 7: name=válido, email=null, age=muito_jovem → ❌ errors: [Email, Age]
Caso 8: name=undefined, email=vazio, age=muito_velho → ❌ errors: [All]
```

**Testes em Jest:**
```typescript
describe('validateUser - Pairwise Testing', () => {
  test('Caso 1: Todos válidos', () => {
    const result = validateUser({
      name: 'João',
      email: 'joao@example.com',
      age: 30
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('Caso 2: Nome inválido, email e age válidos', () => {
    const result = validateUser({
      name: '',
      email: 'joao@example.com',
      age: 30
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });
  
  // ... outros casos
});
```

---

## 🔧 Dicas para Melhores Resultados

### ✅ Boas Práticas

1. **Seja Específico:**
   - ❌ "Gere testes"
   - ✅ "Gere 8 testes Pairwise em Jest/TypeScript que cubra combinações críticas"

2. **Forneça Contexto:**
   - ❌ Código vago
   - ✅ Código completo com tipos, validações, fluxo

3. **Defina Restrições:**
   - ✅ "Máximo 10 cases"
   - ✅ "Cobertura > 90%"
   - ✅ "Foco em edge cases"

4. **Iteração:**
   - Primeira resposta → Revisar
   - Feedback → "Adicione mais casos de erro"
   - Refinar → Até satisfeito

5. **Validação Humana:**
   - Revisar código gerado
   - Testar localmente
   - Adaptar conforme necessário

### ❌ Armadilhas Comuns

1. **Confiar Cegamente:** Sempre revisar código gerado
2. **Não Iterar:** Primeira resposta raramente é perfeita
3. **Falta de Contexto:** Código sem tipos é mais difícil
4. **Não Especificar:** "Teste-me" sem detalhes = resultado genérico
5. **Ignorar Erros:** Se testes falharem, ajustar prompt

---

## 📈 Métricas de Sucesso

Após usar IA para gerar testes, verifique:

```bash
✅ Cobertura > 90%
npm run test:coverage

✅ Sem erros de lint
npm run lint

✅ Complexidade aceitável
npm run complexity

✅ Testes passam
npm test

✅ Tempo de execução < 30s
time npm test
```

---

## 🎓 Exemplos de Prompts Avançados

### Prompt: Teste de Mutação
```
Gere testes que sejam resistentes a mutações para esta função:

[CÓDIGO]

Especificamente detectar mutações em:
- Operadores de comparação (< para <=)
- Operadores lógicos (&& para ||)
- Valores de retorno (true para false)
- Incrementos (++i para i++)

Formato: Jest com explicação de cada mutação detectada.
```

### Prompt: Teste Combinatório Avançado
```
Usando algoritmo PICT (Pairwise Independent Combinatorial Testing),
gere testes para:

[CÓDIGO COM MÚLTIPLOS PARÂMETROS]

Forneça:
1. Análise de força (2-way vs 3-way testing)
2. Matriz reduzida
3. Casos de teste em Jest
4. Cobertura estimada
```

### Prompt: Análise de Cobertura
```
Para o código abaixo, identifique:

[CÓDIGO]

1. Linhas não cobertas
2. Branches não cobertas
3. Casos de teste necessários
4. Prioridade (critical, high, medium)

Formato: Tabela + código de testes sugeridos.
```

---

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io)
- [Pairwise Testing Tools](https://www.microsoft.com/en-us/download/details.aspx?id=20589)
- [Mutation Testing](https://stryker-mutator.io)
- [GitHub Copilot](https://github.com/features/copilot)

---

## 🎯 Resumo do Fluxo

```
Código Original
    ↓
[IA] Analisa parâmetros
    ↓
[IA] Gera matriz Pairwise
    ↓
[IA] Converte em testes
    ↓
Revisa e testa
    ↓
Ajusta conforme necessário
    ↓
✅ Testes prontos
```

---

**Última atualização:** Novembro 2025
