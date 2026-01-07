package pl.karol.simpleessentials.commands;

import org.bukkit.command.*;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class WarpCommand implements CommandExecutor {

    private final JavaPlugin plugin;

    public WarpCommand(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        Player p = (Player) sender;

        if (!plugin.getConfig().contains("warps." + args[0])) return true;

        p.teleport(plugin.getConfig().getLocation("warps." + args[0]));
        p.sendMessage("§aTeleport!");
        return true;
    }
}
