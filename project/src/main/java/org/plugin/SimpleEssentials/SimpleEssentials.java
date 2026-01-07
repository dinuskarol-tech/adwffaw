package pl.karol.simpleessentials;

import org.bukkit.plugin.java.JavaPlugin;
import pl.karol.simpleessentials.commands.*;
import java.util.*;

public class SimpleEssentials extends JavaPlugin {

    public static Map<UUID, UUID> tpaRequests = new HashMap<>();

    @Override
    public void onEnable() {
        saveDefaultConfig();

        getCommand("spawn").setExecutor(new SpawnCommand(this));
        getCommand("sethome").setExecutor(new SetHomeCommand(this));
        getCommand("home").setExecutor(new HomeCommand(this));
        getCommand("heal").setExecutor(new HealCommand());
        getCommand("fly").setExecutor(new FlyCommand());
        getCommand("gm").setExecutor(new GamemodeCommand());
        getCommand("vanish").setExecutor(new VanishCommand());
        getCommand("invsee").setExecutor(new InvseeCommand());
        getCommand("warp").setExecutor(new WarpCommand(this));
        getCommand("setwarp").setExecutor(new SetWarpCommand(this));
        getCommand("tpa").setExecutor(new TpaCommand());
        getCommand("tpaccept").setExecutor(new TpAcceptCommand());
        getCommand("tpdeny").setExecutor(new TpDenyCommand());

        getLogger().info("SimpleEssentials FULL wlaczony!");
    }
}
