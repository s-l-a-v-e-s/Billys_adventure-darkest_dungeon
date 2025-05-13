/**
 * Конфигурационный файл игры
 */

const CONFIG = {
    // Общие настройки
    GAME_NAME: "Billy's Adventure",
    VERSION: "1.0.0",
    
    // Пути к ресурсам
    PATHS: {
        IMAGES: "../assets/images/",
        AUDIO: "../assets/audio/",
        FONTS: "../assets/fonts/"
    },
    
    // Настройки игрока
    PLAYER: {
        DEFAULT_HEALTH: 100,
        DEFAULT_STAMINA: 100,
        MAX_INVENTORY_SLOTS: 20
    },
    
    // Настройки врагов
    ENEMIES: {
        DEFAULT_HEALTH: 50,
        DEFAULT_ATTACK: 10
    }
};

export default CONFIG; 