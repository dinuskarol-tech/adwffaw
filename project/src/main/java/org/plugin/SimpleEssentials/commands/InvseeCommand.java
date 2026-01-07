public class InvseeCommand implements CommandExecutor {
    public boolean onCommand(CommandSender s, Command c, String l, String[] a) {
        Player t = Bukkit.getPlayer(a[0]);
        ((Player)s).openInventory(t.getInventory());
        return true;
    }
}
