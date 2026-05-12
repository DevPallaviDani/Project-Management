[
  {
    "id": "p1",
    "title": "Website Redesign",
    "description": "Revamp the company website with modern UI/UX and improve performance.",
    "dueDate": "2026-05-15"
  },
  {
    "id": "p2",
    "title": "Mobile App Development",
    "description": "Develop a cross-platform mobile application for customer engagement.",
    "dueDate": "2026-06-30"
  },
  {
    "id": "p3",
    "title": "Marketing Campaign Q2",
    "description": "Plan and execute digital marketing campaigns for Q2.",
    "dueDate": "2026-04-25"
  },
  {
    "id": "p4",
    "title": "Internal CRM Tool",
    "description": "Build an internal CRM system for managing leads and sales.",
    "dueDate": "2026-07-10"
  }
],
{
  "projects": [
    {
      "projectId": "MOB-101",
      "projectName": "EcoTrack Mobile",
      "projectDescription": "A cross-platform app for tracking personal carbon footprints with real-time analytics.",
      "dueDate": "2026-06-20",
      "projectType": "Mobile Development",
      "projectStatus": "In Progress",
      "priority": "High",
      "techStack": ["Flutter", "Firebase", "Google Maps API"],
      "tasks": [
        {
          "taskName": "UI Mockup Design",
          "taskDescription": "Create Figma prototypes for the dashboard and login screens.",
          "dueDate": "2026-05-20",
          "projectId": "MOB-101",
          "priority": "High",
          "tag": "Design",
          "taskStatus": "In Progress"
        },
        {
          "taskName": "Push Notification",
          "taskDescription": "Configure Firebase Cloud Messaging (FCM) for eco-alerts.",
          "dueDate": "2026-06-10",
          "projectId": "MOB-101",
          "priority": "Medium",
          "tag": "Feature",
          "taskStatus": "Backlog"
        }
      ]
    },
    {
      "projectId": "BE-202",
      "projectName": "UltraPay Gateway",
      "projectDescription": "Developing a high-concurrency microservice for processing multi-currency global payments.",
      "dueDate": "2026-08-04",
      "projectType": "Backend Systems",
      "projectStatus": "Started",
      "priority": "Critical",
      "techStack": ["Go", "PostgreSQL", "Redis", "Kafka"],
      "tasks": [
        {
          "taskName": "API Authentication",
          "taskDescription": "Implement OAuth2.0 and JWT token handling for secure login.",
          "dueDate": "2026-06-01",
          "projectId": "BE-202",
          "priority": "Critical",
          "tag": "Security",
          "taskStatus": "Started"
        },
        {
          "taskName": "Load Balancer Setup",
          "taskDescription": "Configure Nginx to handle 10k concurrent requests.",
          "dueDate": "2026-07-05",
          "projectId": "BE-202",
          "priority": "High",
          "tag": "DevOps",
          "taskStatus": "Planning"
        }
      ]
    },
    {
      "projectId": "WEB-303",
      "projectName": "MarketFlow ERP",
      "projectDescription": "A cloud-based enterprise resource planning tool for manufacturing firms.",
      "dueDate": "2026-09-03",
      "projectType": "Web Application",
      "projectStatus": "Planning",
      "priority": "Medium",
      "techStack": ["React", "Node.js", "MongoDB", "AWS"],
      "tasks": [
        {
          "taskName": "Database Schema Setup",
          "taskDescription": "Design/deploy initial PostgreSQL schema for manufacturing data.",
          "dueDate": "2026-06-15",
          "projectId": "WEB-303",
          "priority": "Medium",
          "tag": "Database",
          "taskStatus": "Planning"
        }
      ]
    },
    {
      "projectId": "DSK-404",
      "projectName": "SecureDoc Editor",
      "projectDescription": "Desktop application for encrypted document editing and local-first collaboration.",
      "dueDate": "2026-07-05",
      "projectType": "Desktop Software",
      "projectStatus": "Backlog",
      "priority": "Low",
      "techStack": ["Electron", "TypeScript", "SQLite"],
      "tasks": [
        {
          "taskName": "Encryption Module",
          "taskDescription": "Develop the local file encryption logic using AES-256.",
          "dueDate": "2026-06-30",
          "projectId": "DSK-404",
          "priority": "High",
          "tag": "Core",
          "taskStatus": "Backlog"
        }
      ]
    },
    {
      "projectId": "EMB-505",
      "projectName": "SmartGrid Sensor FW",
      "projectDescription": "Firmware development for industrial power grid monitoring sensors.",
      "dueDate": "2026-10-03",
      "projectType": "Embedded Systems",
      "projectStatus": "In Progress",
      "priority": "High",
      "techStack": ["C", "FreeRTOS", "MQTT", "ARM Cortex-M"],
      "tasks": [
        {
          "taskName": "Sensor Calibration",
          "taskDescription": "Write C logic to calibrate voltage readings within 1% margin.",
          "dueDate": "2026-07-10",
          "projectId": "EMB-505",
          "priority": "High",
          "tag": "Firmware",
          "taskStatus": "In Progress"
        }
      ]
    },
    {
      "projectId": "GM-606",
      "projectName": "Nebula Raider",
      "projectDescription": "A space-exploration RPG featuring procedural world generation.",
      "dueDate": "2027-03-02",
      "projectType": "Game Development",
      "projectStatus": "Started",
      "priority": "Medium",
      "techStack": ["Unity", "C#", "Blender", "Photon Engine"],
      "tasks": [
        {
          "taskName": "Physics Engine Config",
          "taskDescription": "Setup collision detection and gravity constants for player models.",
          "dueDate": "2026-08-01",
          "projectId": "GM-606",
          "priority": "Medium",
          "tag": "Engine",
          "taskStatus": "Started"
        }
      ]
    },
    {
      "projectId": "CLD-707",
      "projectName": "DataLake Migration",
      "projectDescription": "Migrating 50TB of legacy on-premise data to cloud architecture.",
      "dueDate": "2026-06-05",
      "projectType": "Cloud Computing",
      "projectStatus": "Completed",
      "priority": "High",
      "techStack": ["Terraform", "AWS S3", "Snowflake"],
      "tasks": [
        {
          "taskName": "Final S3 Bucket Sync",
          "taskDescription": "Validate data integrity after the final 10TB cloud transfer.",
          "dueDate": "2026-05-15",
          "projectId": "CLD-707",
          "priority": "High",
          "tag": "Data",
          "taskStatus": "Completed"
        }
      ]
    },
    {
      "projectId": "MNT-808",
      "projectName": "Legacy CRM Support",
      "projectDescription": "Monthly security patching and bug fixes for the internal CRM.",
      "dueDate": "Ongoing",
      "projectType": "Maintenance & Support",
      "projectStatus": "In Progress",
      "priority": "Low",
      "techStack": ["Java", "Spring Boot", "Jenkins"],
      "tasks": [
        {
          "taskName": "Vulnerability Scan",
          "taskDescription": "Run monthly security sweep and fix discovered SQL injection risks.",
          "dueDate": "2026-05-30",
          "projectId": "MNT-808",
          "priority": "Medium",
          "tag": "Security",
          "taskStatus": "In Progress"
        }
      ]
    }
  ]
}
