# 📸 Screenshots Setup Guide

## How to Add Your Screenshots

### Step 1: Save Your Screenshots

Based on the images you provided, save them with these exact names in the `screenshots/` folder:

1. **taskflow-app.png** - Your TaskFlow application interface
   - The main UI showing tasks, statistics, and filters
   - Screenshot from: `http://13.126.118.36:3000`

2. **jenkins-pipeline.png** - Jenkins pipeline stages view
   - Shows all 7 stages with execution times
   - Screenshot from: Jenkins dashboard stage view

3. **aws-ec2-instance.png** - AWS EC2 instance details
   - Shows instance ID, status, IP addresses
   - Screenshot from: AWS Console EC2 Instances page

4. **aws-security-groups.png** - AWS security group configuration
   - Shows inbound/outbound rules
   - Screenshot from: AWS Console Security Groups page

5. **github-webhook.png** - GitHub webhook configuration
   - Shows webhook URL and settings
   - Screenshot from: GitHub repository Settings > Webhooks

6. **docker-containers.png** - Running Docker containers
   - Shows all three containers (frontend, backend, db)
   - Screenshot from: Terminal running `docker ps`

### Step 2: Screenshot Specifications

**Recommended Settings:**
- Format: PNG (for better quality)
- Resolution: 1920x1080 or higher
- File size: < 2MB per image (optimize if needed)

**What to Capture:**

#### TaskFlow App (taskflow-app.png)
- Full browser window showing the application
- Include the statistics dashboard at the top
- Show some tasks in different states (completed, pending)
- Display the "Add New Task" form
- Make sure the gradient background is visible

#### Jenkins Pipeline (jenkins-pipeline.png)
- Stage View showing all pipeline stages
- Include stage execution times
- Show successful build (green checkmarks)
- Capture the full pipeline from Checkout to Post Actions

#### AWS EC2 Instance (aws-ec2-instance.png)
- Instance details page
- Show instance state as "Running"
- Include public IP address
- Show instance type (t3.small or similar)

#### AWS Security Groups (aws-security-groups.png)
- Inbound rules showing ports 22, 3000, 5000, 8080
- Show source as 0.0.0.0/0 or your IP
- Include description for each rule

#### GitHub Webhook (github-webhook.png)
- Webhook configuration page
- Show the Jenkins URL
- Display "Last delivery was successful" status
- Include events that trigger the webhook

#### Docker Containers (docker-containers.png)
- Terminal output of `docker ps`
- Show all three containers running
- Include container names, ports, and status
- Make sure text is readable

### Step 3: Optimize Images (Optional)

If your images are too large, use these tools:

**Online Tools:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

**Command Line:**
```bash
# Using ImageMagick
convert input.png -quality 85 -resize 1920x1080 output.png

# Using pngquant
pngquant --quality=65-80 input.png
```

### Step 4: Verify Images

After adding images, verify they display correctly:

```bash
# Check if files exist
ls -lh screenshots/

# View in browser (if using VS Code)
# Right-click on README.md > Open Preview
```

### Step 5: Alternative - Use Imgur or GitHub Issues

If you prefer not to commit large images to your repo:

1. Upload images to Imgur: https://imgur.com/
2. Or create a GitHub issue and upload images there
3. Copy the image URLs
4. Update README.md with the URLs:

```markdown
![TaskFlow App](https://i.imgur.com/YOUR_IMAGE_ID.png)
```

## Current Image References in README

The README files currently reference these images:

```
screenshots/taskflow-app.png
screenshots/jenkins-pipeline.png
screenshots/aws-ec2-instance.png
screenshots/aws-security-groups.png
screenshots/github-webhook.png
screenshots/docker-containers.png
```

## Quick Checklist

- [ ] Create `screenshots/` folder (already done ✅)
- [ ] Save taskflow-app.png
- [ ] Save jenkins-pipeline.png
- [ ] Save aws-ec2-instance.png
- [ ] Save aws-security-groups.png
- [ ] Save github-webhook.png
- [ ] Save docker-containers.png
- [ ] Verify images display in README preview
- [ ] Optimize file sizes if needed
- [ ] Commit and push to GitHub

## Tips for Great Screenshots

1. **Clean up your screen** - Close unnecessary tabs and windows
2. **Use full screen** - Maximize the window before capturing
3. **Good lighting** - If capturing from monitor, avoid glare
4. **Highlight important parts** - Use arrows or boxes if needed
5. **Consistent style** - Use same browser/theme for all screenshots
6. **Hide sensitive data** - Blur out any API keys, passwords, or personal info

## Example: Taking Screenshots

### Windows
- **Full Screen**: `Windows + PrtScn`
- **Snipping Tool**: `Windows + Shift + S`
- **Game Bar**: `Windows + G`

### Mac
- **Full Screen**: `Cmd + Shift + 3`
- **Selection**: `Cmd + Shift + 4`
- **Window**: `Cmd + Shift + 4`, then `Space`

### Linux
- **Full Screen**: `PrtScn`
- **Selection**: `Shift + PrtScn`
- **Gnome Screenshot**: `gnome-screenshot`

## Need Help?

If you need help with screenshots:
1. Check if images are in the correct folder
2. Verify file names match exactly (case-sensitive)
3. Make sure images are PNG format
4. Try opening README.md in GitHub to see if images load

---

**Note**: The README files are already configured to display these images. Just add the image files to the `screenshots/` folder and they'll appear automatically!
