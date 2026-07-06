-- ═══════════════════════════════════════════════════════════════
-- GEEKSHOP — MySQL Seed Data Setup
-- ═══════════════════════════════════════════════════════════════

USE geekshop_db;

-- 1. Seed Categories
INSERT INTO categories (id, name, slug, description, icon) VALUES
(1, 'OS & Recovery', 'os-recovery', 'Bootable operating systems diagnostics, repair, and recovery tools.', '💾'),
(2, 'Networking', 'networking', 'High performance network cards, optical transceiver nodes, and adapters.', '🌐'),
(3, 'Cables & Accessories', 'cables-accessories', 'Gold-plated high bandwidth ethernet wires and modules connectors.', '🔌'),
(4, 'Development Boards', 'development-boards', 'Advanced development kits, shields, sensor modules, and IoT nodes.', '🔧'),
(5, 'Displays & Modules', 'displays-modules', 'Liquid crystal character grids and SSD1306 display hardware modules.', '📟'),
(6, 'GPS & Navigation', 'gps-navigation', 'Micro u-blox satellite tracking navigation receiver dongles.', '📡')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Seed Products (17 Items)
INSERT INTO products (id, name, description, price, image_url, category_id, stock, specs, rating_avg) VALUES
(1, 'Penguin 31-in-1 Multi-Boot USB (128GB)', 'Ultimate bootable USB with 31 operating systems pre-loaded. Includes Linux distros, Windows recovery tools, and diagnostic utilities. USB 3.2 Gen1 for fast boot speeds. Perfect for IT professionals and system administrators.', 920097.00, '/images/products/media__1783218404396.png', 1, 25, '{"Capacity": "128GB", "Interface": "USB 3.2 Gen1", "OS Count": "31 Operating Systems", "Includes": "Linux, Windows PE, Recovery Tools", "Read Speed": "Up to 150MB/s", "Dimensions": "65 x 20 x 10mm", "Weight": "15g"}', 4.5),

(2, 'Xtssui 64GB Bootable USB Drive 3.2', 'High-speed bootable USB drive with pre-installed recovery tools and OS installers. USB 3.2 interface ensures rapid boot times and file transfers.', 590000.00, '/images/products/media__1783218421448.png', 1, 40, '{"Capacity": "64GB", "Interface": "USB 3.2", "Read Speed": "Up to 130MB/s", "Write Speed": "Up to 40MB/s", "OS Support": "Windows, Linux", "Dimensions": "58 x 18 x 9mm"}', 4.2),

(3, 'Xtssui 32GB Bootable Windows USB 3.2', 'Compact bootable USB drive with Windows installation media. Plug-and-play setup for quick OS installation and system recovery.', 420000.00, '/images/products/media__1783218434188.png', 1, 55, '{"Capacity": "32GB", "Interface": "USB 3.2", "Read Speed": "Up to 120MB/s", "OS": "Windows 10/11", "Plug & Play": "Yes", "Dimensions": "55 x 18 x 8mm"}', 4.0),

(4, 'VIMIN 10G PCI-E Network Card (X540-T2)', 'Dual-port 10 Gigabit Ethernet PCIe network adapter based on Intel X540-T2 chipset. Ideal for NAS, servers, and high-performance networking environments.', 1417091.00, '/images/products/media__1783218536521.png', 2, 15, '{"Chipset": "Intel X540-T2", "Ports": "2x RJ45 10GbE", "Interface": "PCIe x8", "Speed": "10Gbps per port", "Supported OS": "Windows, Linux, VMware", "Profile": "Full Height + Low Profile Bracket"}', 4.7),

(5, 'BrosTrend 5Gbps PCIe Network Card', 'High-speed 5Gbps PCIe network card for desktop computers. Perfect upgrade for faster wired internet connectivity and network transfers.', 890000.00, '/images/products/media__1783218606322.png', 2, 30, '{"Speed": "5Gbps", "Interface": "PCIe x4", "Port": "1x RJ45", "Chipset": "Realtek RTL8126", "Cable Support": "Cat5e/Cat6/Cat6a", "OS": "Windows 10/11, Linux"}', 4.3),

(6, 'UGREEN Cat 8 Ethernet Cable 6FT', 'Premium Cat 8 Ethernet cable supporting speeds up to 40Gbps and 2000MHz bandwidth. Gold-plated connectors and double-shielded for maximum performance.', 183809.00, '/images/products/media__1783218578780.png', 3, 100, '{"Category": "Cat 8", "Length": "6 feet (1.8m)", "Max Speed": "40Gbps", "Bandwidth": "2000MHz", "Connector": "RJ45 Gold-Plated", "Shielding": "S/FTP Double Shielded"}', 4.6),

(7, 'Arduino® UNO™ Q 4GB [ABX00173]', 'The official Arduino UNO Q with 4GB memory. Features enhanced processing power for complex IoT projects, robotics, and embedded systems development.', 1551464.00, '/images/products/media__1783218691259.jpg', 4, 20, '{"Processor": "ATmega328P", "Memory": "4GB Flash", "Digital I/O": "14 pins (6 PWM)", "Analog Inputs": "6 pins", "Clock Speed": "16 MHz", "USB": "Type-C", "Voltage": "5V / 3.3V"}', 4.8),

(8, 'LinksTek X520 DA1 SFP+ Fiber Card', '10Gb SFP+ fiber network card based on Intel 82599EN chipset. Single-port design for high-speed fiber optic networking in data centers and enterprise environments.', 1051577.00, '/images/products/media__1783218642797.png', 2, 18, '{"Chipset": "Intel 82599EN", "Port": "1x SFP+ 10GbE", "Interface": "PCIe x8", "Speed": "10Gbps", "Fiber Type": "Multi-mode / Single-mode", "OS": "Windows, Linux, FreeBSD, VMware"}', 4.4),

(9, 'ULANSeN 10Gb Open SFP+ PCIe Card', 'Open SFP+ 10 Gigabit PCIe network adapter. Compatible with a wide range of SFP+ transceivers for flexible fiber and DAC connectivity options.', 893801.00, '/images/products/media__1783218664435.png', 2, 22, '{"Speed": "10Gbps", "Interface": "PCIe x8", "Port": "1x Open SFP+", "Transceiver": "Compatible with standard SFP+", "OS": "Windows, Linux, VMware ESXi", "Profile": "Full Height & Low Profile"}', 4.1),

(10, 'Arduino GIGA Display Shield', 'Official Arduino GIGA Display Shield featuring a high-resolution touchscreen display. Perfect companion for the Arduino GIGA R1 WiFi board for GUI-based IoT projects.', 1672426.00, '/images/products/media__1783218677712.png', 4, 12, '{"Display": "3.97\\\" MIPI DSI", "Resolution": "480x800 pixels", "Touch": "Capacitive Touchscreen", "Compatibility": "Arduino GIGA R1 WiFi", "Camera": "Arducam connector", "Audio": "3.5mm jack + microphone", "IMU": "6-axis BMI270"}', 4.6),

(11, 'Hosyond 5 Pcs 0.91\" I2C OLED Module', 'Pack of 5 compact 0.91-inch OLED display modules with I2C interface. SSD1306 driver, perfect for Arduino and ESP32 projects requiring small status displays.', 367881.00, '/images/products/media__1783218709146.png', 5, 45, '{"Quantity": "5 Pieces", "Size": "0.91 inch", "Resolution": "128x32 pixels", "Driver": "SSD1306", "Interface": "I2C (SDA/SCL)", "Voltage": "3.3V - 5V", "Color": "White"}', 4.3),

(12, 'Hosyond 3pcs I2C 1602 LCD Module', 'Set of 3 classic 1602 LCD modules with I2C backpack. 16x2 character display with blue backlight, simplified wiring through I2C interface.', 341585.00, '/images/products/media__1783218753535.jpg', 5, 35, '{"Quantity": "3 Pieces", "Display": "16x2 Characters", "Backlight": "Blue with White Text", "Interface": "I2C (PCF8574T)", "Voltage": "5V", "Contrast": "Adjustable via potentiometer", "Dimensions": "80 x 35 x 11mm"}', 4.0),

(13, 'Lonely Binary TinkerBlock Sensor Kit', 'Comprehensive sensor and module kit with snap-together TinkerBlock design. Includes temperature, humidity, motion, light sensors and more. No soldering required.', 1446017.00, '/images/products/media__1783218771671.jpg', 4, 10, '{"Modules": "20+ Sensor Blocks", "Connection": "Magnetic Snap-Together", "Sensors": "Temp, Humidity, Motion, Light, Sound", "Compatibility": "Arduino, Raspberry Pi, ESP32", "Soldering": "Not Required", "Tutorial": "Online Course Included"}', 4.9),

(14, 'Lonely Binary ESP32-S3 PinPulse Kit', 'ESP32-S3 development kit with PinPulse expansion board. Features WiFi 6, Bluetooth 5, and a rich set of GPIO pins for IoT prototyping.', 657137.00, '/images/products/media__1783218788195.jpg', 4, 28, '{"MCU": "ESP32-S3 Dual Core", "WiFi": "802.11 b/g/n", "Bluetooth": "BLE 5.0", "Flash": "16MB", "PSRAM": "8MB", "GPIO": "36 pins", "USB": "Type-C (Native USB)"}', 4.5),

(15, 'HiLetgo NEO-7M GPS Satellite Module', 'u-blox NEO-7M GPS module with ceramic antenna. High-sensitivity satellite receiver for navigation, tracking, and timing applications. UART interface.', 299511.00, '/images/products/media__1783218844659.png', 6, 50, '{"Chipset": "u-blox NEO-7M", "Channels": "56 channels", "Frequency": "GPS L1 (1575.42MHz)", "Accuracy": "2.5m CEP", "Interface": "UART (TTL)", "Antenna": "Ceramic Active", "Voltage": "3.3V - 5V"}', 4.2),

(16, 'Walfront NEO-7M GPS SMA Module', 'Professional-grade NEO-7M GPS module with SMA connector for external antenna support. Enhanced signal reception for outdoor and vehicle tracking applications.', 801765.00, '/images/products/media__1783218882882.png', 6, 16, '{"Chipset": "u-blox NEO-7M", "Connector": "SMA for External Antenna", "Channels": "56 channels", "Update Rate": "Up to 10Hz", "Accuracy": "2.5m CEP", "Interface": "UART", "Backup Battery": "Rechargeable"}', 4.4),

(17, 'Stemedu USB GPS GLONASS Dongle', 'Plug-and-play USB GPS/GLONASS receiver dongle. Dual satellite system support for improved accuracy. Compatible with Windows, Linux, and Raspberry Pi.', 350000.00, '/images/products/media__1783218909702.png', 6, 38, '{"Systems": "GPS + GLONASS", "Interface": "USB 2.0", "Chipset": "u-blox UBX-G7020", "Accuracy": "2.5m CEP", "Channels": "56", "OS Support": "Windows, Linux, Raspberry Pi", "Driver": "Plug & Play (CDC)"}', 4.1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Seed Demo Users (1 admin, 1 regular user)
-- Passwords: admin123, user123 (hashed using bcrypt)
INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Admin Node', 'admin@geekshop.net', '$2a$10$y5Uup9jCj0cKz1L4b2P6v.1T9k55E.h3o15v.GZ2pM4W70hW2xV2u', 'admin'),
(2, 'Netrunner User', 'user@geekshop.net', '$2a$10$Z3s5CjL4b2P6v.1T9k55E.h3o15v.GZ2pM4W70hW2xV2u', 'user')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. Seed Reviews (3 items)
INSERT INTO reviews (id, user_id, product_id, rating, comment) VALUES
(1, 2, 1, 5, 'Highly recommended boot utility drive. Tested on multiple bios configurations successfully.'),
(2, 2, 4, 5, 'Flawless 10G link speeds. Running continuously on Linux server with no packet losses.'),
(3, 2, 7, 4, 'Very good processing capabilities, though standard pin pulse header requires minor alignment.')
ON DUPLICATE KEY UPDATE comment=VALUES(comment);
