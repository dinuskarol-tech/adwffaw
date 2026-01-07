package pl.karol.simpleessentials.commands;

import org.bukkit.*;
import org.bukkit.command.*;
import org.bukkit.entity.Player;

public class GamemodeCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {

        if (!(sender instanceof Player p)) return true;
        if (!p.hasPermission("se.gm")) return true;
        if (args.length == 0) return true;

        switch (args[0]) {
            case "0" -> p.setGameMode(GameMode.SURVIVAL);
            case "1" -> p.setGameMode(GameMode.CREATIVE);
            case "2" -> p.setGameMode(GameMode.ADVENTURE);
            case "3" -> p.setGameMode(GameMode.SPECTATOR);
        }

        p.sendMessage("§aGamemode zmieniony!");
        return true;
    }
}
