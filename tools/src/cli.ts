#!/usr/bin/env node
import { Command } from "commander";
import { validateCoreCommand } from "./commands/validate-core.js";
import { validateEnrichmentCommand } from "./commands/validate-enrichment.js";
import { validateAllCommand } from "./commands/validate-all.js";
import { translateCommand } from "./commands/translate.js";
import { importCommand } from "./commands/import.js";

const program = new Command();

program
  .name("40kdc-validate")
  .description("Validate 40kdc data files against schemas")
  .version("0.1.0");

program
  .command("validate-core")
  .description("Validate core data files")
  .option("--reporter <mode>", "Output format: pretty or json", "pretty")
  .action(validateCoreCommand);

program
  .command("validate-enrichment")
  .description("Validate enrichment data files")
  .option("--reporter <mode>", "Output format: pretty or json", "pretty")
  .action(validateEnrichmentCommand);

program
  .command("validate-all")
  .description("Validate all data files")
  .option("--reporter <mode>", "Output format: pretty or json", "pretty")
  .action(validateAllCommand);

program
  .command("translate")
  .description("Translate ability DSL to plain English")
  .argument("[path]", "Path to abilities.json file")
  .action(translateCommand);

program
  .command("import")
  .description("Import a ListForge army-list export into a 40kdc roster")
  .argument("[input]", "ListForge URL, base64 segment, JSON, or file path (omit/'-' for stdin)")
  .option("--reporter <mode>", "Output format: json or pretty", "json")
  .option("--out <file>", "Write roster JSON to a file instead of stdout")
  .action(importCommand);

program.parse();
