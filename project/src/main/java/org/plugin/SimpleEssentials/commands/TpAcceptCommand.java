public class TpAcceptCommand implements CommandExecutor {
    public boolean onCommand(CommandSender s, Command c, String l, String[] a) {
        Player p = (Player) s;
        UUID u = SimpleEssentials.tpaRequests.remove(p.getUniqueId());
        Bukkit.getPlayer(u).teleport(p);
        return true;
    }
}
