import { cleanCNPJ } from "./modules/clearCNPJ.js";
import { brasilAPIService } from "./services/brasilapi.js";

document
  .getElementById("cnpjForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const emptySection = document.querySelector("[data-empty]");
    const resultSection = document.querySelector("[data-result]");

    resultSection.setAttribute("data-result", "hidden");
    emptySection.setAttribute("data-empty", "hidden");

    var cnpjValue = document.getElementById("cnpjInput").value;
    const formatCNPJ = cleanCNPJ(cnpjValue);

    try {
      const cnpjData = await brasilAPIService.getCNPJ(formatCNPJ);

      resultSection.querySelector("#razaoSocial").textContent =
        cnpjData.razao_social;
      resultSection.querySelector("#cnpj").textContent = cnpjData.cnpj;
      resultSection.querySelector("#nome_fantasia").value =
        cnpjData.nome_fantasia != "" ? cnpjData.nome_fantasia : "Não possuí";
      resultSection.querySelector("#data_situacao_cadastral").value =
        cnpjData.data_situacao_cadastral;
      resultSection.querySelector("#data_inicio_atividade").value =
        cnpjData.data_inicio_atividade;
      resultSection.querySelector("#descricao_situacao_cadastral").value =
        cnpjData.descricao_situacao_cadastral;
      resultSection.querySelector("#ddd_telefone_1").value =
        cnpjData.ddd_telefone_1;
      resultSection.querySelector("#cnae_fiscal_descricao").value =
        cnpjData.cnae_fiscal_descricao;
      resultSection.querySelector(
        "#endereco"
      ).value = `${cnpjData.descricao_tipo_de_logradouro} ${cnpjData.logradouro}, ${cnpjData.numero}, ${cnpjData.bairro}, ${cnpjData.municipio} - ${cnpjData.uf}, ${cnpjData.cep}`;
      resultSection.querySelector("#email").value = cnpjData.email;

      const cnasList = resultSection.querySelector("#cnaes_secundarios-list");
      const qsaList = resultSection.querySelector("#qsa-list");

      if (cnpjData.cnaes_secundarios.length > 0) {
        cnasList.classList.remove("hidden");

        cnpjData.cnaes_secundarios?.map((item) => {
          resultSection.querySelector("#cnaes_secundarios").insertAdjacentHTML(
            "beforeend",
            `
            <li class="bg-zinc-800 p-3 flex items-center gap-4 rounded-md">
              <div class="grid place-items-center h-8 w-8 rounded-lg bg-emerald-500 text-white">
                <i class="ph ph-building-office text-lg"></i>
              </div>
  
              <h4 class="font-light text-sm">
                ${item.descricao != "" ? item.descricao : "-----"}
              </h4>
            </li>
          `
          );
        });
      } else {
        cnasList.classList.add("hidden");
      }

      if (cnpjData.qsa.length > 0) {
        qsaList.classList.remove("hidden");

        cnpjData.qsa?.map((item) => {
          resultSection.querySelector("#qsa").insertAdjacentHTML(
            "beforeend",
            `
            <li class="bg-zinc-800 p-3 flex justify-between rounded-md">
              <div class="flex items-center gap-4">
                <div class="grid place-items-center h-8 w-8 rounded-lg bg-orange-500 text-white">
                  <i class="ph ph-users text-lg"></i>
                </div>
                
                <div>
                  <h4 class="font-light text-sm">
                    ${item.nome_socio}
                  </h4>
                  
                  <span class="font-light text-sm text-zinc-400">${item.cnpj_cpf_do_socio}</span>
                </div>
              </div>
  
              <span class="text-xs font-light text-zinc-500">
                Sócio desde ${item.data_entrada_sociedade}
              </span>
            </li>
          `
          );
        });
      } else {
        qsaList.classList.add("hidden");
      }

      resultSection.setAttribute("data-result", "visible");
    } catch {
      emptySection.setAttribute("data-empty", "visible");
    }
  });

document
  .getElementById("editForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll("input");
    const changes = {};

    inputs.forEach((input) => {
      changes[input.id] = input.value;
    });

    console.log(changes); // Form values submitted
  });
