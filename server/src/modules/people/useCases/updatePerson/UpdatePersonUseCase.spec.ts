import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdatePersonUseCase } from "./UpdatePersonUseCase";
import { PersonRepositoryInMemory } from "@modules/people/repositories/in-memory/PersonRepositoryInMemory";
let updatePersonUseCase: UpdatePersonUseCase;
let personRepositoryInMemory: PersonRepositoryInMemory;

describe("Update person use case", () => {
  beforeEach(() => {
    personRepositoryInMemory = new PersonRepositoryInMemory();
    updatePersonUseCase = new UpdatePersonUseCase(personRepositoryInMemory);
  });

  it("should be able to update a person", async () => {
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

    const personToUpdate = await updatePersonUseCase.execute(newPerson.id, {
      RazaoSocial: "JOÃO",
    });

    expect(personToUpdate).toBeTruthy();
  });
});
