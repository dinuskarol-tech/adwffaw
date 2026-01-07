package pl.karol.simpleessentials.commands;

import org.bukkit.command.*;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class SpawnCommand implements CommandExecutor {

    private final JavaPlugin plugin;

    public SpawnCommand(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (!(sender instanceof Player p)) return true;

        p.teleport(p.getWorld().getSpawnLocation());
        p.sendMessage("§aTeleport na spawn!");
        return true;
    }
}
