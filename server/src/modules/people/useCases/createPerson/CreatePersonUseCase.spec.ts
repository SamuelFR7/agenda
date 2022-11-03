import "reflect-metadata";
import { describe, beforeEach, it, expect } from "vitest";
import { CreatePersonUseCase } from "./CreatePersonUseCase";
import { PersonRepositoryInMemory } from "../../repositories/in-memory/PersonRepositoryInMemory";
let createPersonUseCase: CreatePersonUseCase;
let personRepositoryInMemory: PersonRepositoryInMemory;

describe("Create person use case", () => {
  beforeEach(() => {
    personRepositoryInMemory = new PersonRepositoryInMemory();
    createPersonUseCase = new CreatePersonUseCase(personRepositoryInMemory);
  });

  it("should be able to create a new person", async () => {
    await createPersonUseCase.execute({
      RazaoSocial: "JOÃO",
      Telefone1: "000000000000",
    });

    const person = await personRepositoryInMemory.filter(1);

    expect(person[0]).toHaveProperty("id");
  });
});
