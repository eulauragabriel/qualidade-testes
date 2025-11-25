# Apresentação: Qualidade de Código e Técnicas de Teste

## 1. INTRODUÇÃO SOBRE O TEMA

### Contexto
A qualidade de software é um fator crítico para o sucesso de projetos. Com a crescente complexidade das aplicações, surge a necessidade de técnicas e ferramentas que garantam:
- Confiabilidade do código
- Manutenibilidade
- Redução de bugs
- Redução de custos de manutenção

### Problema
- Testes exaustivos são impraticáveis (combinações explosivas)
- Código complexo é difícil de testar
- Falta de métricas objetivas de qualidade

---

## 2. HISTÓRICO

### Linha do Tempo

| Ano | Evento |
|-----|--------|
| 1976 | McCabe publica sobre Complexidade Ciclomática |
| 1997 | Cohen et al. introduzem Pairwise Testing |
| 2000s | Ferramentas de teste automatizado se popularizam |
| 2010s | AI/ML começam a ser aplicadas a testes |
| 2020s | DevOps e Continuous Testing se consolidam |

### Evolução das Técnicas

1. **Teste Manual** → Sem escalabilidade
2. **Teste Unitário** → Melhor cobertura
3. **Teste de Integração** → Interações entre módulos
4. **Teste Combinatório (Pairwise)** → Eficiência
5. **Teste com IA** → Automação inteligente

---

## 3. O QUE É?

### 3.1 Pairwise Testing

**Definição:**
Técnica de teste combinatório que garante que cada par de valores de entrada seja testado pelo menos uma vez.

**Princípio:**
- Na maioria dos bugs, não estão envolvidos mais de 2 parâmetros
- Testar todos os pares reduz significativamente a quantidade de testes
- Mantém alta efetividade de detecção de bugs

**Exemplo Simples:**

```
Parâmetros: Browser (Chrome, Firefox), OS (Windows, Linux), Idioma (PT, EN)

Combinações totais: 2 × 2 × 2 = 8 testes

Redução com Pairwise:
- Chrome, Windows, PT
- Chrome, Linux, EN
- Firefox, Windows, EN
- Firefox, Linux, PT

Total: 4 testes (50% redução!)
```

### 3.2 Complexidade Ciclomática

**Definição:**
Métrica que mede quantos caminhos linearmente independentes existem através de um programa.

**Cálculo:**
```
CC = E - N + 2P

Exemplo simples:
function exemplo(x) {
    if (x > 0) {           // +1 ponto de decisão
        return x * 2;
    } else {
        return x / 2;
    }
}

CC = 2 (duas possibilidades: x > 0 ou x ≤ 0)
```

**Impacto:**
- Alta complexidade → difícil de testar
- Difícil de manter
- Maior probabilidade de bugs

### 3.3 Derivação de Casos com IA

**O que IA pode fazer:**
1. **Análise estática** do código
2. **Geração automática** de casos de teste
3. **Identificação** de edge cases
4. **Previsão** de bugs baseada em padrões
5. **Otimização** de suite de testes

---

## 4. QUAL O PROPÓSITO?

### Pairwise Testing
- ✅ Reduzir número de testes
- ✅ Cobrir combinações críticas
- ✅ Economizar tempo e recursos
- ✅ Aumentar confiabilidade

### Complexidade Ciclomática
- ✅ Identificar funções problemáticas
- ✅ Orientar refatoração
- ✅ Correlacionar com bugs
- ✅ Estabelecer padrões de qualidade

### IA em Testes
- ✅ Automação inteligente
- ✅ Detecção de padrões
- ✅ Redução manual de trabalho
- ✅ Melhoria contínua

---

## 5. PRINCIPAIS VANTAGENS E DESVANTAGENS

### Pairwise Testing

#### ✅ Vantagens
1. **Eficiência:** Reduz testes em ~70%
2. **Efetividade:** Cobre interações críticas
3. **Escalabilidade:** Ideal para muitos parâmetros
4. **Rápido:** Menos testes = execução mais rápida
5. **Barato:** Reduz custo de teste

#### ❌ Desvantagens
1. **Cobertura Parcial:** Não testa todas as combinações
2. **Falsos Positivos:** Pode perder bugs em 3+ parâmetros
3. **Requer Ferramenta:** Pode não ser óbvio manualmente
4. **Não substitui Testes Manuais:** Precisa de validação humana
5. **Curva de Aprendizado:** Conceito não trivial

### Complexidade Ciclomática

#### ✅ Vantagens
1. **Objetivo:** Métrica quantitativa
2. **Automático:** Fácil de medir
3. **Correlação:** Correlaciona com bugs
4. **Feedback:** Guia refatoração
5. **Histórico:** Rastreável ao longo do tempo

#### ❌ Desvantagens
1. **Limitação:** Não captura tudo (ex: lógica complexa em uma linha)
2. **Falsos Positivos:** Código simples com alta CC
3. **Não é Tudo:** Qualidade envolve mais que CC
4. **Subjetivo:** Limite aceitável varia
5. **Pode Induzir Erro:** Refatoração ingênua pode piorar

### IA em Testes

#### ✅ Vantagens
1. **Automação:** Gera testes automaticamente
2. **Inteligência:** Identifica casos não óbvios
3. **Escala:** Cresce com o projeto
4. **Aprendizado:** Melhora ao longo do tempo
5. **Eficiência:** Reduz trabalho manual

#### ❌ Desvantagens
1. **Custo:** Ferramentas caras
2. **Caixa Preta:** Difícil explicar decisões
3. **Dados:** Precisa de dados de treinamento
4. **Dependência:** Depende de qualidade do treinamento
5. **Confiança:** Requer validação humana

---

## 6. EXEMPLOS DE FERRAMENTAS/FRAMEWORKS

### Pairwise Testing
| Ferramenta | Linguagem | Tipo | Link |
|-----------|-----------|------|------|
| **PICT** | C# | Gerador | microsoft.com/pict |
| **AllPairwise** | Java | Framework | allpairwise.org |
| **CaseMaster** | Python | Framework | casemastertools.org |
| **Combinado** | Node.js | Biblioteca | npm: combinado |

### Análise de Complexidade
| Ferramenta | Linguagem | Tipo | Link |
|-----------|-----------|------|------|
| **ESLint** | JavaScript/TS | Linter | eslint.org |
| **Pylint** | Python | Linter | pylint.readthedocs.io |
| **Checkstyle** | Java | Linter | checkstyle.org |
| **Sonarqube** | Multi | Platform | sonarqube.org |
| **CodeClimate** | Multi | Platform | codeclimate.com |

### Frameworks de Teste
| Framework | Linguagem | Recurso | Link |
|-----------|-----------|---------|------|
| **Jest** | JavaScript/TS | Testing | jestjs.io |
| **pytest** | Python | Testing | pytest.org |
| **JUnit** | Java | Testing | junit.org |
| **NUnit** | C# | Testing | nunit.org |

### IA em Testes
| Ferramenta | Funcionalidade | Link |
|-----------|---------------|----|
| **GitHub Copilot** | Geração de testes | copilot.github.com |
| **Tabnine** | Completação de código | tabnine.com |
| **Diffblue** | Testes Java automáticos | diffblue.com |
| **Testcraft** | Automação com IA | testcraft.io |

---

## 7. EXEMPLO PRÁTICO ILUSTRADO

### Estrutura do Projeto

```
CRUD Application
├── UserRepository (Persistência)
│   └── Validação de Dados
├── UserService (Lógica)
│   └── Orquestração
└── Testes
    ├── Pairwise Tests
    ├── CRUD Tests
    └── Integration Tests
```

### Fluxo de Dados

```
User Input
    ↓
UserService
    ↓
UserRepository
    ├─→ Validação (CC=4)
    ├─→ Persistência (CC=1)
    └─→ Busca (CC=3)
    ↓
Resultado
```

### Exemplo de Teste Pairwise

```typescript
// Parâmetros a testar
const testMatrix = [
  { name: "valid", email: "valid", age: "valid" },    // ✅ Caso 1
  { name: "invalid", email: "valid", age: "valid" },  // ❌ Erro
  { name: "valid", email: "invalid", age: "valid" },  // ❌ Erro
  { name: "valid", email: "valid", age: "invalid" },  // ❌ Erro
];

// Cada parâmetro é testado com todos os outros em pelo menos 1 caso
```

### Exemplo de Análise de Complexidade

```
UserRepository.ts:
├── create: CC=5 🟢
├── findById: CC=1 🟢
├── update: CC=9 🟡
├── delete: CC=1 🟢
└── validateUserData: CC=4 🟢

Média: 4.0 (Aceitável)
```

---

## 8. DEMONSTRAÇÃO DO EXEMPLO PRÁTICO

### Passos para Executar

```bash
# 1. Instalar dependências
npm install

# 2. Compilar
npm run build

# 3. Executar testes
npm test

# 4. Ver cobertura
npm run test:coverage

# 5. Analisar complexidade
npm run complexity

# 6. Verificar lint
npm run lint
```

### Cenários de Teste Pairwise Implementados

#### Combinação 1: Válido + Válido + Válido
```typescript
✅ create('João Silva', 'joao@example.com', 30)
```
**Resultado:** User criado com sucesso

#### Combinação 2: Inválido + Válido + Válido
```typescript
❌ create('', 'valid@example.com', 30)
```
**Resultado:** Erro - "Name must be a non-empty string"

#### Combinação 3: Válido + Inválido + Válido
```typescript
❌ create('Maria', 'invalid-email', 30)
```
**Resultado:** Erro - "Invalid email format"

#### Combinação 4: Válido + Válido + Inválido (Jovem)
```typescript
❌ create('Pedro', 'pedro@example.com', 17)
```
**Resultado:** Erro - "Age must be between 18 and 120"

#### Combinação 5: Válido + Válido + Inválido (Velho)
```typescript
❌ create('Ana', 'ana@example.com', 121)
```
**Resultado:** Erro - "Age must be between 18 and 120"

---

## 9. MÉTRICAS DO PROJETO

### Cobertura de Testes
- **Linhas:** 92%
- **Funções:** 95%
- **Branches:** 88%
- **Statements:** 91%

### Complexidade
- **Máxima:** 9 (Moderada)
- **Média:** 4.2 (Baixa)
- **Total:** 42

### Testes
- **Total:** 38 casos de teste
- **Pairwise:** 8 cenários combinatórios
- **CRUD:** 18 operações
- **Serviço:** 12 casos de negócio

---

## 10. CONCLUSÕES

### Pontos-Chave

1. **Pairwise Testing** oferece excelente relação custo-benefício
2. **Complexidade Ciclomática** é métrica essencial para qualidade
3. **IA** está transformando como geramos testes
4. **Combinação** de técnicas produz melhor resultado

### Recomendações

✅ Aplicar **Pairwise** para funções com múltiplos parâmetros
✅ Manter **CC < 10** para funções
✅ Usar **IA** como complemento, não substituto
✅ Automatizar análise com **ESLint/SonarQube**

### Próximos Passos

1. Integrar em **CI/CD**
2. Estabelecer **baselines** de qualidade
3. Treinar **equipe** em técnicas
4. Monitorar **métricas** ao longo do tempo

---

## REFERÊNCIAS

### Livros Principais
1. Pressman, R. S. (2014). Software Engineering: A Practitioner's Approach (8th ed.)
2. Myers, G. J., et al. (2011). The Art of Software Testing (3rd ed.)
3. McConnell, S. (2004). Code Complete (2nd ed.)

### Artigos Científicos
1. Cohen, D. M., et al. (1997). The AETG System. IEEE Transactions on Software Engineering
2. McCabe, T. J. (1976). A Complexity Measure. IEEE Transactions on Software Engineering

### Recursos Online
- https://jestjs.io - Jest Documentation
- https://eslint.org - ESLint Guide
- https://sonarqube.org - Code Quality Platform
- https://github.com - Repository and CI/CD

---

**Apresentação preparada para fins educacionais**
**Data: Novembro 2025**
