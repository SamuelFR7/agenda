import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { ShowPersonUseCase } from "./ShowPersonUseCase";
import { PersonRepositoryInMemory } from "@modules/people/repositories/in-memory/PersonRepositoryInMemory";
let showPersonUseCase: ShowPersonUseCase;
let personRepositoryInMemory: PersonRepositoryInMemory;

describe("Show person use case", () => {
  beforeEach(() => {
    personRepositoryInMemory = new PersonRepositoryInMemory();
    showPersonUseCase = new ShowPersonUseCase(personRepositoryInMemory);
  });

  it("should be able to show a person", async () => {
    const newPerson = await personRepositoryInMemory.create({
      RazaoSocial: "EDUARDO",
      Telefone1: "000000000000",
      Telefone2: "",
      Telefone3: "",
      Telefone4: "",
      Telefone5: "",
      Telefone1Contato: "",
      Telefone2Contato: "",
      Telefone3Contato: "",
      Telefone4Contato: "",
      Telefone5Contato: "",
      Email: "",
      Endereco: "",
      Observacoes: "",
    });

    const person = await showPersonUseCase.execute(newPerson.id);

    expect(person).toBeTruthy();
  });
});
