package pl.karol.simpleessentials.commands;

import org.bukkit.*;
import org.bukkit.command.*;
import org.bukkit.entity.Player;

public class FlyCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {

        if (!sender.hasPermission("se.fly")) {
            sender.sendMessage("§cBrak uprawnien!");
            return true;
        }

        Player p = sender instanceof Player ? (Player) sender : null;
        if (args.length > 0) p = Bukkit.getPlayer(args[0]);
        if (p == null) return true;

        boolean fly = !p.getAllowFlight();
        p.setAllowFlight(fly);
        p.sendMessage("§aFly: " + (fly ? "ON" : "OFF"));
        return true;
    }
}
