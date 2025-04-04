# Internal Coordination: Multi-Agent Implementation Notice

This codebase is being built with the help of **multiple AI agents working independently**.

---

## 🧠 Shared Rules for All Agents

1. **You Are Not Working Alone**
   - Assume there are **at least 2 agents** working in parallel.
   - Others may have implemented, deleted, or modified parts of the code you're looking at.

2. **Always Check These First**
   - `work_progress/update.md`: Tracks the latest implementation notes, resolved issues, and ongoing blockers.
   - `work_progress/merger_plan_01.md`: Master plan for integrating the four original codebases into one.
   - `work_progress/agent_cline_instructions.md` or `agent_2_instructions.md`: Your individual scope and responsibilities.

3. **Rules of Engagement – Strict Linear Workflow**
   - **One Task at a Time**: Do not start a new task before the current one is fully working and committed.
   - **No Overengineering**: Implement what’s required. No improvements, no extras unless specified.
   - **Fail Fast**: If something blocks you (broken import, layout, API), stop and log it.
   - **Only Touch Assigned Files**: Stay within scope. Don’t modify unrelated code.
   - **Visual/Functional Confirmation Required**: Task is not done until it works in the browser/dev output.
   - **No Backend Work Until Frontend Verified**: Chat logic, API, Jest stay on hold until UI is solid.
   - **All Changes Logged**: Use `work_progress/update.md`. Timestamped. Agent-tagged. Bullet format.
   - **GitHub Workflow Required**: All changes must be committed to the `agent-dev` branch using structured messages. Before each push, run:
     ```
     git pull --ff-only origin agent-dev
     git push origin agent-dev
     ```
     Use commit messages like:
     ```
     [Agent Name] Brief description of change
     ```

4. **Your Role**
   - Follow your assigned instructions in `agent_cline_instructions.md` or `agent_2_instructions.md`.
   - Follow `merger_plan_01.md` strictly. No skipping. No improvisation.

5. **Tools Available in MCP Server**
   - **Sequential Thinking** – break down logic step-by-step.
   - **GitHub** – repo operations and diffs.
   - **Puppeteer** – browser automation.
   - **@21st-dev/magic** – advanced design/code utilities.
   - **Browser Tools** – DOM inspection, interaction simulation.

> Use these tools only when needed, and always log the output or result assumptions in `update.md`.

---

## 🚀 Reminder

This is a **multi-agent, shared AI workspace**. Think clearly. Execute tightly. Communicate only through `update.md`. Follow the plan. Don’t guess. Don’t wander.

> Do not merge to `main` until the frontend is fully verified and approved. `agent-dev` is your active workspace branch.