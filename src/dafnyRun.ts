/* dafnyCodeFile: path name of file containing dafny code
 * Spawns a process to run dafny, then writes whatever dafny outputs to dafnyOutput.txt,
 * to be sent back later.
 */

import { spawn } from "child_process";
export default function runDafny(dafnyCodeFile: string) {
  var content: string = "";
  // check if dafny is installed
  // const dafnyCheck = spawn("./dafny.sh");

  const child = spawn(
    __dirname + "/dafny/dafny",
    ["verify", dafnyCodeFile],
    {}
  );

  // concatenating all output from the shell to content
  child.stdout.on("data", (data: string) => {
    content.concat(`stdout: ${data}`);
    console.log(data.toString());
    child.stdin.end();
  });

  child.stderr.on("data", (data: string) => {
    content.concat(`stderr: ${data}`);
  });

  child.on("close", (code: number) => {
    content.concat(`child process exited with code ${code}`);
  });

  // write whatever dafny outputs to a file
  //   fs.appendFileSync(__dirname + "/Dafny-Files" + "/dafnyOutput.txt", content);
  console.log(content);
  return content;
}
