// components/ScriptureReading.tsx
import { Calendar, MapPin, BookOpen } from 'lucide-react';

export function ScriptureReading() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
      {/* Header Section */}
      <div className="bg-amber-50 px-8 py-6 border-b border-amber-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">
              5th Sunday of Easter
            </h1>
            <div className="flex items-center gap-4 mt-2 text-stone-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>May 10, 2026</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Lectionary: 54</span>
              </div>
            </div>
          </div>
          <div className="bg-amber-100 px-4 py-2 rounded-lg">
            <span className="text-amber-800 font-medium">Year C</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="divide-y divide-stone-100">
        {/* First Reading */}
        <div className="px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
            <h2 className="text-xl font-serif font-semibold text-stone-800">First Reading</h2>
            <span className="text-stone-500 text-sm ml-2">Acts 8:1-8</span>
          </div>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              On that day a great persecution broke out against the church in Jerusalem, 
              and all except the apostles were scattered throughout Judea and Samaria. 
              Godly men buried Stephen and mourned deeply for him. But Saul began to destroy 
              the church. Going from house to house, he dragged off both men and women and 
              put them in prison.
            </p>
            <div className="bg-amber-50/50 p-4 rounded-lg italic border-l-4 border-amber-300">
              <p className="font-serif text-stone-700">Philip in Samaria</p>
            </div>
            <p>
              Those who had been scattered preached the word wherever they went. 
              Philip went down to a city in Samaria and proclaimed the Messiah there.
            </p>
          </div>
        </div>

        {/* Responsorial Psalm */}
        <div className="px-8 py-6 bg-stone-50/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-serif font-semibold text-stone-800">Responsorial Psalm</h2>
            <span className="text-stone-500 text-sm ml-2">Psalm 66</span>
          </div>
          <div className="space-y-3 text-stone-700 leading-relaxed">
            <p className="font-serif text-lg text-stone-800">Response: <span className="font-semibold">"Let all the earth cry out to God with joy."</span></p>
            <div className="mt-4 space-y-2">
              <p>Shout with joy to God, all the earth!<br />
              Sing the glory of his name; make his praise glorious.</p>
              <p>Say to God, "How awesome are your deeds!<br />
              All the earth bows down to you; they sing praise to you."</p>
              <p>Come and see what God has done,<br />
              his awesome deeds for mankind!</p>
            </div>
          </div>
        </div>

        {/* Second Reading */}
        <div className="px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-serif font-semibold text-stone-800">Second Reading</h2>
            <span className="text-stone-500 text-sm ml-2">1 Peter 3:15-18</span>
          </div>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              But in your hearts revere Christ as Lord. Always be prepared to give an answer 
              to everyone who asks you to give the reason for the hope that you have. 
              But do this with gentleness and respect, keeping a clear conscience, so that 
              those who speak maliciously against your good behavior in Christ may be ashamed 
              of their slander.
            </p>
            <p>
              For it is better, if it is God's will, to suffer for doing good than for doing evil. 
              For Christ also suffered once for sins, the righteous for the unrighteous, to bring 
              you to God. He was put to death in the body but made alive in the Spirit.
            </p>
          </div>
        </div>

        {/* Gospel Acclamation */}
        <div className="px-8 py-4 bg-amber-50/30 border-l-4 border-amber-400">
          <p className="text-stone-700 italic">
            <span className="font-semibold not-italic">Gospel Acclamation:</span> John 14:23
          </p>
          <p className="text-stone-800 mt-1">
            "Whoever loves me will keep my word, and my Father will love him, and we will come to him."
          </p>
        </div>

        {/* Gospel */}
        <div className="px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-xl font-serif font-semibold text-stone-800">Gospel</h2>
            <span className="text-stone-500 text-sm ml-2">John 14:15-21</span>
          </div>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              Jesus said to his disciples: "If you love me, keep my commands. And I will ask the Father, 
              and he will give you another advocate to help you and be with you forever—the Spirit of truth. 
              The world cannot accept him, because it neither sees him nor knows him. But you know him, 
              for he lives with you and will be in you.
            </p>
            <p>
              I will not leave you as orphans; I will come to you. Before long, the world will not see me 
              anymore, but you will see me. Because I live, you also will live. On that day you will realize 
              that I am in my Father, and you are in me, and I am in you.
            </p>
            <p>
              Whoever has my commands and keeps them is the one who loves me. The one who loves me will be 
              loved by my Father, and I too will love them and show myself to them."
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-stone-50 px-8 py-4 border-t border-stone-200 text-center text-stone-500 text-sm">
        <p>© 2026 — Readings for the 5th Sunday of Easter, Lectionary Year C</p>
      </div>
    </div>
  );
}