import { atom } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null
});

const userAtom = atom({
    key: 'user',
    default: null
});
const personasAtom = atom({
    key: 'personas',
    default: null
});

const personaAtom = atom({
    key: 'persona',
    default: null
});
const empresasAtom = atom({
    key: 'empresas',
    default: null
});

const empresaAtom = atom({
    key: 'empresa',
    default: null
});

export { 
    usersAtom,
    userAtom,
    personasAtom,
    personaAtom,
    empresasAtom,
    empresaAtom,
};