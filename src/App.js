import React, { useState, useEffect } from "react";
import { Pane, Table, SegmentedControl, IconButton, VolumeUpIcon } from "evergreen-ui";
import A21KJSON from "./data/A2-1-K";

export default function App() {

  const units = () => {
    const result = [];
    for (let i = 1; i <= 18; i++)
      result.push({
        label: "Bài " + i,
        value: "Bài " + i
      });
    return result;
  };
  
  const [words, setWords] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("Bài 1");

  useEffect(() => {
    const obj = JSON.parse(JSON.stringify(A21KJSON));
    for (let i = 1; i <= 18; i++)
      setWords(obj[selectedUnit.toString()]);
  }, [selectedUnit]);

  function playAudio(word) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "ja-JP";
    utterance.text = word;
    utterance.pitch = 0.6;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  function renderUnitSegmentedControl() {
    return (
      <SegmentedControl
        options={units()}
        value={selectedUnit}
        onChange={unit => setSelectedUnit(unit)}
      />
    );
  }

  function renderWordsTable() {
    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>
            Index
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Word
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Accent
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Vietnamese
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Audio
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {words.map(b => (
            <Table.Row key={b["Index"]}>
              <Table.TextCell>{b["Index"]}</Table.TextCell>
              <Table.TextCell>{b["Word"]}</Table.TextCell>
              <Table.TextCell>{b["Accent"]}</Table.TextCell>
              <Table.TextCell>{b["Vietnamese"]}</Table.TextCell>
              <Table.Cell>
                <IconButton 
                  onClick={() => playAudio(b["Word"])}
                  icon={VolumeUpIcon}
                >
                  Speak
                  </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  return (
    <Pane>
      {renderUnitSegmentedControl()}
      <br />
      {renderWordsTable()}
    </Pane>
  );
}