package pl.karol.simpleessentials.commands;

import org.bukkit.command.*;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class HomeCommand implements CommandExecutor {

    private final JavaPlugin plugin;

    public HomeCommand(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (!(sender instanceof Player p)) return true;

        if (!plugin.getConfig().contains("homes." + p.getUniqueId())) {
            p.sendMessage("§cNie masz home!");
            return true;
        }

        p.teleport(plugin.getConfig().getLocation("homes." + p.getUniqueId()));
        p.sendMessage("§aTeleport!");
        return true;
    }
}
