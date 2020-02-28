const alfy = require("alfy");

const input = alfy.input.replace(/ -i$/g, "");
const nym = alfy.input === input ? "synonyms" : "antonyms";

const { data } = await alfy.fetch(
  `https://tuna.thesaurus.com/pageData/${input}`
);
const definitions = data ? data.definitionData.definitions[0][nym] : [];
if (definitions.length === 0) {
  return alfy.log(`No ${nym} found for "${input}"`);
}

const items = definitions.map(item => ({
  title: item.term,
  subtitle: `Similarity: ${item.similarity}`,
  arg: item.term
}));

alfy.output(items);
