package pl.karol.simpleessentials.commands;

import org.bukkit.command.*;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class SetWarpCommand implements CommandExecutor {

    private final JavaPlugin plugin;

    public SetWarpCommand(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        Player p = (Player) sender;

        plugin.getConfig().set("warps." + args[0], p.getLocation());
        plugin.saveConfig();
        p.sendMessage("§aWarp ustawiony!");
        return true;
    }
}
