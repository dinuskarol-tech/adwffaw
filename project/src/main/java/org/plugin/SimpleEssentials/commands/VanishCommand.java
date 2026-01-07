public class VanishCommand implements CommandExecutor {
    static Set<Player> vanished = new HashSet<>();
    public boolean onCommand(CommandSender s, Command c, String l, String[] a) {
        Player p = (Player) s;
        if (vanished.contains(p)) {
            vanished.remove(p);
            Bukkit.getOnlinePlayers().forEach(pl -> pl.showPlayer(p));
        } else {
            vanished.add(p);
            Bukkit.getOnlinePlayers().forEach(pl -> pl.hidePlayer(p));
        }
        return true;
    }
}
