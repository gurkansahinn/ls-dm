import { Account } from "../domain/player/account";

declare global {
	interface PlayerMp {
		account: Account;
	}
}

export { };
