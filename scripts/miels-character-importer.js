var vEnum = null;
import("./vampire_enum.js").then((module) => {
  vEnum = module;
});

const importVtm5e = async (data) => {
  let cgObj = data.cg_obj;
  let type = "vampire";
  switch (cgObj.type) {
    case 0:
      type = "mortal";
      if (cgObj.goule == true)
        type = "ghoul";
      break;
  }

  var skills = {
    firearms: { value: 0, bonuses: [] },
    animalken: { value: 0, bonuses: [] },
    academics: { value: 0, bonuses: [] },
    craft: { value: 0, bonuses: [] },
    leadership: { value: 0, bonuses: [] },
    finance: { value: 0, bonuses: [] },
    athletics: { value: 0, bonuses: [] },
    insight: { value: 0, bonuses: [] },
    investigation: { value: 0, bonuses: [] },
    brawl: { value: 0, bonuses: [] },
    etiquette: { value: 0, bonuses: [] },
    medicine: { value: 0, bonuses: [] },
    drive: { value: 0, bonuses: [] },
    streetwise: { value: 0, bonuses: [] },
    occult: { value: 0, bonuses: [] },
    stealth: { value: 0, bonuses: [] },
    intimidation: { value: 0, bonuses: [] },
    politics: { value: 0, bonuses: [] },
    larceny: { value: 0, bonuses: [] },
    performance: { value: 0, bonuses: [] },
    science: { value: 0, bonuses: [] },
    melee: { value: 0, bonuses: [] },
    persuasion: { value: 0, bonuses: [] },
    technology: { value: 0, bonuses: [] },
    survival: { value: 0, bonuses: [] },
    subterfuge: { value: 0, bonuses: [] },
    awareness: { value: 0, bonuses: [] }
  }

  var disciplines = {
    "animalism": {
      "name": "WOD5E.VTM.Animalism",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "auspex": {
      "name": "WOD5E.VTM.Auspex",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "celerity": {
      "name": "WOD5E.VTM.Celerity",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "dominate": {
      "name": "WOD5E.VTM.Dominate",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "fortitude": {
      "name": "WOD5E.VTM.Fortitude",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "obfuscate": {
      "name": "WOD5E.VTM.Obfuscate",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "potence": {
      "name": "WOD5E.VTM.Potence",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "presence": {
      "name": "WOD5E.VTM.Presence",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "protean": {
      "name": "WOD5E.VTM.Protean",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "sorcery": {
      "name": "WOD5E.VTM.BloodSorcery",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "oblivion": {
      "name": "WOD5E.VTM.Oblivion",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "alchemy": {
      "name": "WOD5E.VTM.ThinBloodAlchemy",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "rituals": {
      "name": "WOD5E.VTM.Rituals",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    },
    "ceremonies": {
      "name": "WOD5E.VTM.Ceremonies",
      "description": "",
      "value": 0,
      "powers": [],
      "visible": false
    }
  }

  skills.firearms.value = parseInt(cgObj.skills[0]);
  skills.animalken.value = parseInt(cgObj.skills[1]);
  skills.academics.value = parseInt(cgObj.skills[2]);
  skills.craft.value = parseInt(cgObj.skills[3]);
  skills.leadership.value = parseInt(cgObj.skills[4]);
  skills.finance.value = parseInt(cgObj.skills[5]);
  skills.athletics.value = parseInt(cgObj.skills[6]);
  skills.insight.value = parseInt(cgObj.skills[7]);
  skills.investigation.value = parseInt(cgObj.skills[8]);
  skills.brawl.value = parseInt(cgObj.skills[9]);
  skills.etiquette.value = parseInt(cgObj.skills[10]);
  skills.medicine.value = parseInt(cgObj.skills[11]);
  skills.drive.value = parseInt(cgObj.skills[12]);
  skills.streetwise.value = parseInt(cgObj.skills[13]);
  skills.occult.value = parseInt(cgObj.skills[14]);
  skills.stealth.value = parseInt(cgObj.skills[15]);
  skills.intimidation.value = parseInt(cgObj.skills[16]);
  skills.politics.value = parseInt(cgObj.skills[17]);
  skills.larceny.value = parseInt(cgObj.skills[18]);
  skills.performance.value = parseInt(cgObj.skills[19]);
  skills.science.value = parseInt(cgObj.skills[20]);
  skills.melee.value = parseInt(cgObj.skills[21]);
  skills.persuasion.value = parseInt(cgObj.skills[22]);
  skills.technology.value = parseInt(cgObj.skills[23]);
  skills.survival.value = parseInt(cgObj.skills[24]);
  skills.subterfuge.value = parseInt(cgObj.skills[25]);
  skills.awareness.value = parseInt(cgObj.skills[26]);

  for (var spec of cgObj.specs) {
    let relatedSkill = vEnum.Skills[parseInt(spec.comp)].name;
    let specName = spec.spec;
    let newSpec = {
      "source": specName,
      "value": "1",
      "paths": [
        "skills." + relatedSkill
      ],
      "displayWhenInactive": true,
      "isActive": false
    }
    try {
      skills[relatedSkill].bonuses.push(newSpec);
    }
    catch {
      ui.notifications.error(`Couldn't add bonus to skill "${relatedSkill}". Does it exist with this name?`);
    }
  }

  for (var discipline of cgObj.disciplines) {
    let discName = vEnum.Disciplines[discipline.id].name;
    disciplines[discName].value = discipline.level;
    disciplines[discName].powers = discipline.powers;
    disciplines[discName].visible = true;

  }

  let actor = await Actor.create({
    name: data.name,
    type: type,
    img: "icons/svg/mystery-man.svg",
    system: {
      "clan": { value: vEnum.Clans[cgObj.clan].name },
      "headers": {
        "predator": cgObj.predation,
        "sire": cgObj.sire,
        "domitor": cgObj.sire,
        "generation": cgObj.generation
      },
      "health": {
        max: 3 + parseInt(cgObj.attributes.stamina),
        value: 3 + parseInt(cgObj.attributes.stamina)
      },
      "willpower": {
        max: parseInt(cgObj.attributes.resolve) + parseInt(cgObj.attributes.composure),
        value: parseInt(cgObj.attributes.resolve) + parseInt(cgObj.attributes.composure)
      },
      "abilities": {
        "strength": {
          "value": parseInt(cgObj.attributes.strength),
          "name": "WOD5E.Attributes.Strength"
        },
        "charisma": {
          "value": parseInt(cgObj.attributes.charisma),
          "name": "WOD5E.Attributes.Charisma"
        },
        "intelligence": {
          "value": parseInt(cgObj.attributes.intelligence),
          "name": "WOD5E.Attributes.Intelligence"
        },
        "dexterity": {
          "value": parseInt(cgObj.attributes.dexterity),
          "name": "WOD5E.Attributes.Dexterity"
        },
        "manipulation": {
          "value": parseInt(cgObj.attributes.manipulation),
          "name": "WOD5E.Attributes.Manipulation"
        },
        "wits": {
          "value": parseInt(cgObj.attributes.cunning),
          "name": "WOD5E.Attributes.Wits"
        },
        "stamina": {
          "value": parseInt(cgObj.attributes.stamina),
          "name": "WOD5E.Attributes.Stamina"
        },
        "composure": {
          "value": parseInt(cgObj.attributes.composure),
          "name": "WOD5E.Attributes.Composure"
        },
        "resolve": {
          "value": parseInt(cgObj.attributes.resolve),
          "name": "WOD5E.Attributes.Resolve"
        }
      },
      "skills": skills,
      "bloodPotencyValue": parseInt(cgObj.blood),
      "blood": {
        potency: parseInt(cgObj.blood)
      },
      "disciplines": disciplines
    }
  });

  const pack = game.packs.get('miels-character-importer.disciplines');
  await pack.getIndex().then(async () => {
    for (var discipline of cgObj.disciplines) {
      let discName = vEnum.Disciplines[discipline.id].name;
      for (var power of discipline.powers) {
        let itemSearch = pack.index.find(e => e.name === power);
        if (itemSearch != undefined) {
          let itemId = itemSearch._id;
          await pack.getDocument(itemId).then(async (item) => {
            await Item.createDocuments([item], { parent: actor });
          })
        }
      }
    }
  });

}

const importCharacterLoad = async (event) => {
  let characterData = JSON.parse(event.target.result);
  let currentSystem = game.system.id;

  switch (characterData.system) {
    case "3":
      if (currentSystem != 'vtm5e') {
        ui.notifications.error("This character is made for Vampire 5e, could not import.");
        return;
      }
      importVtm5e(characterData);
      break;
    default:
      ui.notifications.error("Could not recognize character's system. Import process cancelled.");
      return;
  }
}

const importCharacter = (files) => {
  for (var file of files) {
    let reader = new FileReader();
    reader.addEventListener('load', (e) => { importCharacterLoad(e) });
    reader.readAsText(file);
  }

}

const importCharacterPopup = () => {
  stayOpen = false;
  files = null;
  let d = new Dialog({
    title: "Miel's Character Importer",
    content: "<p>Please choose the character to import.</p>",
    buttons: {
      one: {
        icon: '<i class="fas fa-check"></i>',
        label: "Select file...",
        callback: () => {
          stayOpen = true;
          var input = document.createElement('input');
          input.type = 'file';
          input.multiple = true;
          input.accept = '.json';

          input.onchange = e => {
            files = e.target.files;
          }

          input.click();
        }
      },
      two: {
        icon: '<i class="fas fa-check"></i>',
        label: "Import !",
        callback: () => { importCharacter(files); }
      }
    },
    default: "two",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: () => {
      if (stayOpen) {
        stayOpen = false;
        d.render(true);
      }
    }

  });
  d.render(true);

}

Hooks.on("renderSidebarTab", function (e) {
  if (e instanceof ActorDirectory) {
    let actorsTab = document.getElementById("actors");
    let footerOfActors = actorsTab.getElementsByClassName('directory-footer')[0];

    let actionDiv = document.createElement('div');
    let importButton = document.createElement('button');
    let buttonIcon = document.createElement('i');

    actionDiv.classList.add("action-buttons");
    actionDiv.classList.add("flexrow");

    buttonIcon.classList.add("fa-user");
    buttonIcon.classList.add("fas");

    importButton.classList.add("create-document");
    importButton.classList.add("create-entry");
    importButton.appendChild(buttonIcon);
    importButton.textContent = "Import Miel's Actor";

    importButton.addEventListener("click", importCharacterPopup);

    actionDiv.appendChild(importButton);

    footerOfActors.appendChild(actionDiv);
  }
})


Hooks.on("ready", function () {
});