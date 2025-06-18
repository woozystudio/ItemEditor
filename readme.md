![](https://raw.githubusercontent.com/woozystudios/branding/main/itemeditor/logo.svg "Banner")

# ItemEditor

<p>
		<a href="https://discord.gg/DW6fuPABcN"><img src="https://img.shields.io/discord/1198275487169003583?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
	</p>
	<p>
		<a href="https://woozystudio.com"><img src="https://raw.githubusercontent.com/woozystudios/branding/main/powered-by-woozystudio.svg" alt="woozystudio" /></a>
	</p>

ItemEditor is a Minecraft: Bedrock Edition add-on developed for simple and efficient in-game item management.

The latest downloads, wiki & other useful links can be found on the project homepage at [woozystudio.com/projects/itemeditor](https://woozystudio.com/projects/itemeditor/).

## Building

ItemEditor uses TypeScript for behavioral package scripts. We do not use addon creation tools.

#### Compiling from source

```sh
git clone https://github.com/woozystudio/ItemEditor.git
cd LuckPerms/
```

The following command must be executed in Windows PowerShell as administrator.

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Run this one, too.

```powershell
npm run local-deploy
```

You can find the compiled TypeScript in the `lib/scripts` or `dist/scripts` directories.

## Contributing

The contribution rules will be added in the future, for the moment you can make a contribution freely.

## License

ItemEditor is licensed under the permissive MIT license. Please see [`license`](https://github.com/woozystudio/ItemEditor/blob/master/license) for more info.
