For most when asked to access the Event Log on a remote server they’re going to RDP to the machine and open the Event Log. The next “advancement” is using their local Event Viewer, and going to Action > Connect to local computer. However, there’s an even better way.

There’s a server concept called lights out, not going to explain it in detail here so you can go look it up. It basically says you DON’T log into your remote servers AT ALL. While conceptually excellent, like many things in theory they work better there than in practice. Also, like many things in theory, if you’ll following the practices and principles, then they make for better practice.

Insert using PowerShell and:

	Enter-PSSession [server-name]

Then once connected to the remote machine you can use Get-EventLog to read whatever Event Log you’re looking for. I find that to typically be the Appliction log and you want to see the most recent messages. So you can do something like:

	Get-EventLog Application -newest 2 | format-table TimeGenerated, Message -wrap

If you want to see avaliable fields then you can do:

	Get-EventLog Application -newest 1 | select *

It’s generally good practice to finish with:

	Exit-PSSession

Enjoy!
