window.IMAGES = {};

export function preloadImages() {
  window.IMAGES.backgroundImage = loadImage(
    "../../../media/assets/background/modeled-background-no-color.png"
  );

  window.IMAGES.bubbleSoldierPlainGif = loadImage(
    "../../../media/assets/characters/bubble-empty.gif"
  );
  window.IMAGES.bubbleSoldierHelmetGif = loadImage(
    "../../../media/assets/characters/bubble-helmet.gif"
  );
  window.IMAGES.bubbleSoldierChestplateGif = loadImage(
    "../../../media/assets/characters/bubble-chestplate.gif"
  );
  window.IMAGES.bubbleSoldierShieldGif = loadImage(
    "../../../media/assets/characters/bubble-shield.gif"
  );

  window.IMAGES.dustSoldierPlainGif = loadImage(
    "../../../media/assets/characters/dust-empty.gif"
  );
  window.IMAGES.dustSoldierHelmetGif = loadImage(
    "../../../media/assets/characters/dust-helmet.gif"
  );
  window.IMAGES.dustSoldierCloakGif = loadImage(
    "../../../media/assets/characters/dust-cloak.gif"
  );
  window.IMAGES.dustSoldierShieldGif = loadImage(
    "../../../media/assets/characters/dust-shield.gif"
  );
}
