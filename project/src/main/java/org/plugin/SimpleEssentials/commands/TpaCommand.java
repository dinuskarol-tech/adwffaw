public class TpaCommand implements CommandExecutor {
    public boolean onCommand(CommandSender s, Command c, String l, String[] a) {
        if (!(s instanceof Player p)) return true;
        Player t = Bukkit.getPlayer(a[0]);
        SimpleEssentials.tpaRequests.put(t.getUniqueId(), p.getUniqueId());
        t.sendMessage("§e" + p.getName() + " chce sie do Ciebie teleportowac (/tpaccept)");
        return true;
    }
}
