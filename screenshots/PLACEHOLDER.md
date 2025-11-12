# 📸 Add Your Screenshots Here

## Required Screenshots

Place your screenshot images in this folder with these exact names:

### 1. taskflow-app.png
**What to capture:** Your TaskFlow application running in the browser
- URL: `http://your-ec2-ip:3000`
- Show: Dashboard with statistics, task list, and add task form
- Size: 1920x1080 recommended

### 2. jenkins-pipeline.png
**What to capture:** Jenkins pipeline stage view
- URL: `http://your-ec2-ip:8080/job/task-manager-cicd/`
- Show: All pipeline stages with execution times
- Include: Green checkmarks for successful stages

### 3. aws-ec2-instance.png
**What to capture:** AWS EC2 instance details
- Location: AWS Console > EC2 > Instances
- Show: Instance ID, state (running), public IP
- Include: Instance type and availability zone

### 4. aws-security-groups.png
**What to capture:** Security group inbound rules
- Location: AWS Console > EC2 > Security Groups
- Show: Ports 22, 3000, 5000, 8080 open
- Include: Source IPs and descriptions

### 5. github-webhook.png
**What to capture:** GitHub webhook configuration
- Location: GitHub Repo > Settings > Webhooks
- Show: Jenkins webhook URL
- Include: "Last delivery was successful" status

### 6. docker-containers.png
**What to capture:** Running Docker containers
- Command: `docker ps`
- Show: All three containers (frontend, backend, db)
- Include: Container names, ports, and status

## Quick Instructions

1. Take screenshots of each component
2. Save them with the exact names above
3. Place them in this `screenshots/` folder
4. The README will automatically display them

## Alternative: Use Image URLs

If you prefer, you can:
1. Upload images to Imgur or similar service
2. Update the README.md files with the image URLs
3. Replace `screenshots/filename.png` with the full URL

---

**Current Status:** 📁 Folder created, waiting for images

Once you add the images, delete this PLACEHOLDER.md file.
