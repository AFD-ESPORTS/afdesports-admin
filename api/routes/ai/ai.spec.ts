import { rewiremock } from "../../tests/helpers/rewireMock";
import chaiAsPromised from "chai-as-promised";

describe("AI Code Checker", () => {
  let chai;
  let expect;

  //   before(async () => {
  //     chai = await import("chai");
  //     expect = chai.expect;
  //     chai.use(chaiAsPromised);
  //   });
  beforeEach(() => {
    rewiremock.enable();
  });
  afterEach(() => {
    rewiremock.disable();
  });
  it("doit retourner une demande de l'IA pour une vérification de code", async () => {
    // const mockedAiCtrl = await rewiremock.module(() => import("./ai.ctrl"), {
    //   explainCode: async () => {
    //     return "Le code fait ceci";
    //   },
    // });
    // const aiCtrl = rewiremock.proxy(() => import("./ai.ctrl"), {
    //   "./ai.ctrl": (r) => r.default,
    // });
    // const testAiCtrl = aiCtrl.explainCode("const a = 1;");
    // expect(testAiCtrl).toEqual("Le code fait ceci");
  });
  it("doit retourner une erreur 500", async () => {});
  it("doit retourner une erreur d'authentification OpenAI", async () => {});
});
