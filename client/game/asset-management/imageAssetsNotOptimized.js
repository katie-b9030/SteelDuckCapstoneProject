window.IMAGES = {};

window.numDefaultFrames = 120;
window.numDeathFrames = 60;

export function preloadLanesImages() {
  window.IMAGES.lanesBackgroundImage = loadImage(
    "../../../media/assets/backgrounds/bg-zoom-static-blur.png"
  );

  // window.IMAGES.bubbleSoldierPlainGif = loadImage(
  //   "../../../media/assets/characters/bubble-empty.gif"
  // );
  // window.IMAGES.bubbaleSoldierHelmetGif = loadImage(
  //   "../../../media/assets/characters/bubble-helmet.gif"
  // );
  // window.IMAGES.bubbleSoldierChestplateGif = loadImage(
  //   "../../../media/assets/characters/bubble-chestplate.gif"
  // );
  // window.IMAGES.bubbleSoldierShieldGif = loadImage(
  //   "../../../media/assets/characters/bubble-shield.gif"
  // );

  // window.IMAGES.dustSoldierPlainGif = loadImage(
  //   "../../../media/assets/characters/dust-empty.gif"
  // );
  // window.IMAGES.dustSoldierHelmetGif = loadImage(
  //   "../../../media/assets/characters/dust-helmet.gif"
  // );
  // window.IMAGES.dustSoldierCloakGif = loadImage(
  //   "../../../media/assets/characters/dust-cloak.gif"
  // );
  // window.IMAGES.dustSoldierShieldGif = loadImage(
  //   "../../../media/assets/characters/dust-shield.gif"
  // );

  window.IMAGES.bubbleSoldierShieldWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierShieldWalkFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-shield-walk/bubble-soldier-shield-walk${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierShieldAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierShieldAttackFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-shield-attack/bubble-soldier-shield-attack${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierShieldDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.bubbleSoldierShieldDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-shield-damaged/bubble-soldier-shield-damaged${i}.svg`
    );
  }

  window.IMAGES.bubbleSoldierChestWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierChestWalkFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-armor-walk/bubble-soldier-armor-walk${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierChestAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierChestAttackFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-armor-attack/bubble-soldier-armor-attack${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierChestDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.bubbleSoldierChestDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-armor-damaged/bubble-soldier-armor-damaged${i}.svg`
    );
  }

  window.IMAGES.bubbleSoldierHelmetWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierHelmetWalkFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-helmet-walk/bubble-soldier-helmet-walk${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierHelmetAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierHelmetAttackFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-helmet-attack/bubble-soldier-helmet-attack${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierHelmetDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.bubbleSoldierHelmetDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-helmet-damaged/bubble-soldier-helmet-damaged${i}.svg`
    );
  }

  window.IMAGES.bubbleSoldierDefaultWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierDefaultWalkFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-default-walk/bubble-soldier-default-walk${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierDefaultAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleSoldierDefaultAttackFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-default-attack/bubble-soldier-default-attack${i}.svg`
    );
  }
  window.IMAGES.bubbleSoldierDefaultDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.bubbleSoldierDefaultDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-default-damaged/bubble-soldier-default-damaged${i}.svg`
    );
  }

  window.IMAGES.bubbleSoldierDeathFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.bubbleSoldierDeathFrames[i] = loadImage(
      `../../../media/assets/characters/bubble/bubble-soldier-death/bubble-soldier-death${i}.svg`
    );
  }

  window.IMAGES.dustSoldierShieldWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierShieldWalkFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-shield-walk/dust-soldier-shield-walk${i}.svg`
    );
  }
  window.IMAGES.dustSoldierShieldAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierShieldAttackFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-shield-attack/dust-soldier-shield-attack${i}.svg`
    );
  }
  window.IMAGES.dustSoldierShieldDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.dustSoldierShieldDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-shield-damaged/dust-soldier-shield-damaged${i}.svg`
    );
  }

  window.IMAGES.dustSoldierChestWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierChestWalkFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-armor-walk/dust-soldier-armor-walk${i}.svg`
    );
  }
  window.IMAGES.dustSoldierChestAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierChestAttackFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-armor-attack/dust-soldier-armor-attack${i}.svg`
    );
  }
  window.IMAGES.dustSoldierChestDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.dustSoldierChestDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-armor-damaged/dust-soldier-armor-damaged${i}.svg`
    );
  }

  window.IMAGES.dustSoldierHelmetWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierHelmetWalkFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-helmet-walk/dust-soldier-helmet-walk${i}.svg`
    );
  }
  window.IMAGES.dustSoldierHelmetAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierHelmetAttackFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-helmet-attack/dust-soldier-helmet-attack${i}.svg`
    );
  }
  window.IMAGES.dustSoldierHelmetDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.dustSoldierHelmetDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-helmet-damaged/dust-soldier-helmet-damaged${i}.svg`
    );
  }

  window.IMAGES.dustSoldierDefaultWalkFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierDefaultWalkFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-default-walk/dust-soldier-default-walk${i}.svg`
    );
  }
  window.IMAGES.dustSoldierDefaultAttackFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustSoldierDefaultAttackFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-default-attack/dust-soldier-default-attack${i}.svg`
    );
  }
  window.IMAGES.dustSoldierDefaultDamagedFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.dustSoldierDefaultDamagedFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-default-damaged/dust-soldier-default-damaged${i}.svg`
    );
  }

  window.IMAGES.dustSoldierDeathFrames = [];
  for (let i = 0; i < numDeathFrames; i++) {
    IMAGES.dustSoldierDeathFrames[i] = loadImage(
      `../../../media/assets/characters/dust/dust-soldier-death/dust-soldier-death${i}.svg`
    );
  }
}

export function preloadBubbleBarrelImages() {
  window.IMAGES.bubbleBarrelBackgroundImage = loadImage(
    "../../../media/assets/backgrounds/layout-clean-blur.png"
  );
  window.IMAGES.bubbleProgressBar = loadImage(
    "../../../media/assets/ui/bubble-bar-empty.png"
  );
  window.IMAGES.barrel = loadImage("../../../media/assets/ui/barrel.png");

  window.IMAGES.bubbleShieldFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleShieldFrames[i] = loadImage(
      `../../../media/assets/armor/bubble-shield/bubble-shield${i}.svg`
    );
  }

  window.IMAGES.bubbleChestFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleChestFrames[i] = loadImage(
      `../../../media/assets/armor/bubble-armor/bubble-chestplate${i}.svg`
    );
  }

  window.IMAGES.bubbleHelmetFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.bubbleHelmetFrames[i] = loadImage(
      `../../../media/assets/armor/bubble-helmet/bubble-helmet${i}.svg`
    );
  }
}

export function preloadDustBarrelImages() {
  window.IMAGES.dustBarrelBackgroundImage = loadImage(
    "../../../media/assets/backgrounds/layout-dirty-blur.png"
  );
  window.IMAGES.dustProgressBar = loadImage(
    "../../../media/assets/ui/dust-bar-empty.png"
  );
  window.IMAGES.barrel = loadImage("../../../media/assets/ui/barrel.png");

  window.IMAGES.dustShieldFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustShieldFrames[i] = loadImage(
      `../../../media/assets/armor/dust-shield/dust-shield${i}.svg`
    );
  }

  window.IMAGES.dustChestFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustChestFrames[i] = loadImage(
      `../../../media/assets/armor/dust-armor/dust-cloak${i}.svg`
    );
  }

  window.IMAGES.dustHelmetFrames = [];
  for (let i = 0; i < numDefaultFrames; i++) {
    IMAGES.dustHelmetFrames[i] = loadImage(
      `../../../media/assets/armor/dust-helmet/dust-helmet${i}.svg`
    );
  }
}
