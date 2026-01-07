package pl.karol.simpleessentials.commands;

import org.bukkit.*;
import org.bukkit.command.*;
import org.bukkit.entity.Player;

public class HealCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {

        if (!sender.hasPermission("se.heal")) {
            sender.sendMessage("§cBrak uprawnien!");
            return true;
        }

        if (args.length == 0 && sender instanceof Player p) {
            p.setHealth(20);
            p.setFoodLevel(20);
            p.sendMessage("§aUleczono!");
            return true;
        }

        Player target = Bukkit.getPlayer(args[0]);
        if (target == null) return true;

        target.setHealth(20);
        target.setFoodLevel(20);
        target.sendMessage("§aZostales uleczony!");
        return true;
    }
}
