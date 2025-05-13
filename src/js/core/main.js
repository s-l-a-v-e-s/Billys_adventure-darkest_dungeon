/**
 * Основной файл игры
 */

import { initGame, startGame, saveGame, loadGame } from './index.js';
import CONFIG from './config.js';

// Экспортируем необходимые функции
export { initGame, startGame, saveGame, loadGame };

// Дополнительная функциональность
export class GameManager {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentScene = null;
    }

    /**
     * Запуск игры
     */
    start() {
        this.isRunning = true;
        startGame();
    }

    /**
     * Пауза игры
     */
    pause() {
        this.isPaused = true;
        console.log('Игра приостановлена');
    }

    /**
     * Возобновление игры
     */
    resume() {
        this.isPaused = false;
        console.log('Игра возобновлена');
    }

    /**
     * Завершение игры
     */
    end() {
        this.isRunning = false;
        console.log('Игра завершена');
    }

    /**
     * Изменение текущей сцены
     */
    changeScene(sceneName) {
        this.currentScene = sceneName;
        console.log(`Переход на сцену: ${sceneName}`);
    }
}

// Создаем менеджер игры
export const gameManager = new GameManager();
