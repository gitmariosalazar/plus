CREATE TABLE logs_notification (
  id_logs_notification INT AUTO_INCREMENT PRIMARY KEY,
  log TEXT NOT NULL,
  message TEXT NOT NULL,
  subject VARCHAR(150) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(100),

  module VARCHAR(100) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  user_id INT,
  user_email VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  status_code INT,
  kafka_topic VARCHAR(100),
  correlation_id VARCHAR(100),

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user_id (user_id),
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at),
  INDEX idx_user_email (user_email)
);
