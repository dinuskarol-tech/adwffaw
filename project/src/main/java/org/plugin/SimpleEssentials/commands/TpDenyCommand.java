public class TpDenyCommand implements CommandExecutor {
    public boolean onCommand(CommandSender s, Command c, String l, String[] a) {
        SimpleEssentials.tpaRequests.remove(((Player)s).getUniqueId());
        s.sendMessage("§cTPA odrzucone");
        return true;
    }
}
