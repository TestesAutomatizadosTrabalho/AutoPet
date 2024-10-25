module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Adiciona a transformação com Babel
    },
    moduleFileExtensions: ['js', 'jsx'], // Extensões de arquivo que Jest vai reconhecer
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'], // Certifique-se de que o axios seja transformado

    testEnvironment: 'jsdom', // Adicione esta linha para usar jsdom
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };
  