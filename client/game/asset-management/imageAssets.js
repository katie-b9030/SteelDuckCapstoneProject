// Optimized by chatGPT to prevent server from getting overloaded with loading images

window.IMAGES = {};

window.numDefaultFrames = 120;
window.numDeathFrames = 60;

function loadImageAsync(path) {
  return new Promise((resolve) => {
    loadImage(
      path,
      img => resolve(img),
      err => {
        console.warn("Failed to load image:", path, err);
        resolve(null); 
      }
    );
  });
}

async function loadImagesInBatches(paths, batchSize = 10) {
  const results = [];
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    const loaded = await Promise.all(batch.map(p => loadImageAsync(p)));
    results.push(...loaded);
  }
  return results;
}

async function preloadFrames(prefix, count) {
  const paths = Array.from({ length: count }, (_, i) =>
    `${prefix}${i}.svg`
  );
  return await loadImagesInBatches(paths, 10);
}

export async function preloadLanesImages() {
  window.IMAGES = {};

  // backgrounds
  IMAGES.lanesBackgroundImage = await loadImageAsync(
    "../../../media/assets/backgrounds/bg-zoom-static-blur.png"
  );

  // bubble soldier 
  IMAGES.bubbleSoldierShieldWalkFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-shield-walk/bubble-soldier-shield-walk",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierShieldAttackFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-shield-attack/bubble-soldier-shield-attack",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierShieldDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-shield-damaged/bubble-soldier-shield-damaged",
    numDeathFrames
  );

  IMAGES.bubbleSoldierChestWalkFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-armor-walk/bubble-soldier-armor-walk",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierChestAttackFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-armor-attack/bubble-soldier-armor-attack",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierChestDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-armor-damaged/bubble-soldier-armor-damaged",
    numDeathFrames
  );

  IMAGES.bubbleSoldierHelmetWalkFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-helmet-walk/bubble-soldier-helmet-walk",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierHelmetAttackFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-helmet-attack/bubble-soldier-helmet-attack",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierHelmetDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-helmet-damaged/bubble-soldier-helmet-damaged",
    numDeathFrames
  );

  IMAGES.bubbleSoldierDefaultWalkFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-default-walk/bubble-soldier-default-walk",
    numDefaultFrames
  );

  IMAGES.bubbleSoldierDefaultDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-default-damaged/bubble-soldier-default-damaged",
    numDeathFrames
  );

  IMAGES.bubbleSoldierDeathFrames = await preloadFrames(
    "../../../media/assets/characters/bubble/bubble-soldier-death/bubble-soldier-death",
    numDeathFrames
  );

  // dust soldiers
  IMAGES.dustSoldierShieldWalkFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-shield-walk/dust-soldier-shield-walk",
    numDefaultFrames
  );

  IMAGES.dustSoldierShieldAttackFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-shield-attack/dust-soldier-shield-attack",
    numDefaultFrames
  );

  IMAGES.dustSoldierShieldDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-shield-damaged/dust-soldier-shield-damaged",
    numDeathFrames
  );

  IMAGES.dustSoldierChestWalkFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-armor-walk/dust-soldier-armor-walk",
    numDefaultFrames
  );

  IMAGES.dustSoldierChestAttackFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-armor-attack/dust-soldier-armor-attack",
    numDefaultFrames
  );

  IMAGES.dustSoldierChestDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-armor-damaged/dust-soldier-armor-damaged",
    numDeathFrames
  );

  IMAGES.dustSoldierHelmetWalkFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-helmet-walk/dust-soldier-helmet-walk",
    numDefaultFrames
  );

  IMAGES.dustSoldierHelmetAttackFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-helmet-attack/dust-soldier-helmet-attack",
    numDefaultFrames
  );

  IMAGES.dustSoldierHelmetDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-helmet-damaged/dust-soldier-helmet-damaged",
    numDeathFrames
  );

  IMAGES.dustSoldierDefaultWalkFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-default-walk/dust-soldier-default-walk",
    numDefaultFrames
  );

  IMAGES.dustSoldierDefaultAttackFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-default-attack/dust-soldier-default-attack",
    numDefaultFrames
  );

  IMAGES.dustSoldierDefaultDamagedFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-default-damaged/dust-soldier-default-damaged",
    numDeathFrames
  );

  IMAGES.dustSoldierDeathFrames = await preloadFrames(
    "../../../media/assets/characters/dust/dust-soldier-death/dust-soldier-death",
    numDeathFrames
  );

  // Bubble barrel / UI
  IMAGES.bubbleBarrelBackgroundImage = await loadImageAsync(
    "../../../media/assets/backgrounds/layout-clean-blur.png"
  );

  IMAGES.bubbleProgressBar = await loadImageAsync(
    "../../../media/assets/ui/bubble-bar-empty.png"
  );

  IMAGES.barrel = await loadImageAsync(
    "../../../media/assets/ui/barrel.png"
  );

  IMAGES.bubbleShieldFrames = await preloadFrames(
    "../../../media/assets/armor/bubble-shield/bubble-shield",
    numDefaultFrames
  );

  IMAGES.bubbleChestFrames = await preloadFrames(
    "../../../media/assets/armor/bubble-armor/bubble-chestplate",
    numDefaultFrames
  );

  IMAGES.bubbleHelmetFrames = await preloadFrames(
    "../../../media/assets/armor/bubble-helmet/bubble-helmet",
    numDefaultFrames
  );

  // Dust barrel / UI
  IMAGES.dustBarrelBackgroundImage = await loadImageAsync(
    "../../../media/assets/backgrounds/layout-dirty-blur.png"
  );

  // this asset doesn't exist?
  // IMAGES.dustProgressBar = await loadImageAsync(
  //   "../../../media/assets/ui/dust-bar-empty.png"
  // );

  IMAGES.dustShieldFrames = await preloadFrames(
    "../../../media/assets/armor/dust-shield/dust-shield",
    numDefaultFrames
  );

  IMAGES.dustChestFrames = await preloadFrames(
    "../../../media/assets/armor/dust-armor/dust-cloak",
    numDefaultFrames
  );

  IMAGES.dustHelmetFrames = await preloadFrames(
    "../../../media/assets/armor/dust-helmet/dust-helmet",
    numDefaultFrames
  );
}
