class MobileTerm {
    constructor() {
        this.initElements();
        this.setupEventListeners();
        this.updateSystemInfo();
        this.welcomeMessage();
    }

    initElements() {
        this.outputElement = document.getElementById('terminalOutput');
        this.inputElement = document.getElementById('commandInput');
        this.sendButton = document.getElementById('sendCommand');
        this.deviceNameElement = document.getElementById('deviceName');
        this.batteryElement = document.getElementById('batteryLevel');
        this.timeElement = document.getElementById('currentTime');
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.executeCommand());
        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.executeCommand();
        });

        document.querySelectorAll('.quick-commands button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputElement.value = e.target.dataset.cmd;
                this.executeCommand();
            });
        });
    }

    updateSystemInfo() {
        // Получение информации об устройстве
        this.deviceNameElement.textContent = navigator.userAgent;
        
        // Обновление времени
        setInterval(() => {
            const now = new Date();
            this.timeElement.textContent = now.toLocaleTimeString();
        }, 1000);

        // Уровень батареи
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                this.batteryElement.textContent = `${Math.round(battery.level * 100)}%`;
            });
        }
    }

    welcomeMessage() {
        const messages = [
            `Mobile Terminal v1.0`,
            `Устройство: ${navigator.userAgent}`,
            `Готов к работе. Введите 'help' для справки.`
        ];
        messages.forEach(msg => this.displayOutput(msg));
    }

    executeCommand() {
        const command = this.inputElement.value.trim();
        if (!command) return;

        this.displayOutput(`$ ${command}`);
        
        const [cmd, ...args] = command.split(' ');
        
        switch(cmd.toLowerCase()) {
            case 'help':
                this.showHelp();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'ls':
                this.listFiles();
                break;
            case 'pwd':
                this.displayCurrentPath();
                break;
            default:
                this.displayOutput(`Команда не распознана: ${cmd}`);
        }

        this.inputElement.value = '';
    }

    displayOutput(message) {
        const msgElement = document.createElement('div');
        msgElement.textContent = message;
        this.outputElement.appendChild(msgElement);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    showHelp() {
        const commands = [
            'help - Показать справку',
            'clear - Очистить экран',
            'ls - Список файлов',
            'pwd - Текущий путь'
        ];
        commands.forEach(cmd => this.displayOutput(cmd));
    }

    clearTerminal() {
        this.outputElement.innerHTML = '';
    }

    listFiles() {
        // Эмуляция списка файлов
        const files = [
            'document.txt',
            'image.jpg',
            'script.js',
            'config.json'
                  ];
        files.forEach(file => this.displayOutput(file));
    }

    displayCurrentPath() {
        // Эмуляция текущего пути
        this.displayOutput('/sdcard/MobileTerm');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileTerm();
});
