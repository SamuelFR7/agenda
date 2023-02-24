interface ICreatePersonDTO {
    RazaoSocial: string;
    Telefone1: string;
    Telefone1Contato?: string;
    Telefone2?: string;
    Telefone2Contato?: string;
    Telefone3?: string;
    Telefone3Contato?: string;
    Telefone4?: string;
    Telefone4Contato?: string;
    Telefone5?: string;
    Telefone5Contato?: string;
    Email?: string;
    Endereco?: string;
    Observacoes?: string;
}

export type { ICreatePersonDTO };
