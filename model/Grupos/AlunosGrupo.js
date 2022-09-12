const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AlunosGrupoResposta = new Schema({
    grupoId: {
        type: String
    },
    alunoId: {
        type: String
    },
    alunoNome: {
        type: String
    },
    alunoInstituicao: {
        type: String
    }
}, {
    collection: 'alunos_grupo'
});

module.exports = mongoose.model('AlunosGrupoResposta', AlunosGrupoResposta);