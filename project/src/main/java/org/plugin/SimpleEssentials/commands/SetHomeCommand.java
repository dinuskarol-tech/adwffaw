package pl.karol.simpleessentials.commands;

import org.bukkit.command.*;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class SetHomeCommand implements CommandExecutor {

    private final JavaPlugin plugin;

    public SetHomeCommand(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (!(sender instanceof Player p)) return true;

        plugin.getConfig().set("homes." + p.getUniqueId(), p.getLocation());
        plugin.saveConfig();
        p.sendMessage("§aHome ustawiony!");
        return true;
    }
}
