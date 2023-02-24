class Person {
    id?: string;
    RazaoSocial: string;
    Telefone1: string;
    Telefone1Contato: string;
    Telefone2: string;
    Telefone2Contato: string;
    Telefone3: string;
    Telefone3Contato: string;
    Telefone4: string;
    Telefone4Contato: string;
    Telefone5: string;
    Telefone5Contato: string;
    Email: string;
    Endereco: string;
    Observacoes: string;

    private constructor(person: Person) {
        return Object.assign(this, {
            RazaoSocial: person.RazaoSocial,
            Telefone1: person.Telefone1,
            Telefone1Contato: person.Telefone1Contato,
            Telefone2: person.Telefone2,
            Telefone2Contato: person.Telefone2Contato,
            Telefone3: person.Telefone3,
            Telefone3Contato: person.Telefone3Contato,
            Telefone4: person.Telefone4,
            Telefone4Contato: person.Telefone4Contato,
            Telefone5: person.Telefone5,
            Telefone5Contato: person.Telefone5Contato,
            Email: person.Email,
            Endereco: person.Endereco,
            Observacoes: person.Observacoes,
        });
    }

    static create(personInfo: Person) {
        const person = new Person(personInfo);

        return person;
    }
}

export { Person };
