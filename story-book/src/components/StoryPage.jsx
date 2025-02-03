import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Camera } from 'lucide-react';

// Hardcoded Stories (same as previous version)
const STORIES = [
  {
    title: "The Midnight Library",
    protagonist: "Emma Carter",
    plot: `Beneath the shroud of an eternal midnight, hidden within the forgotten alleyways of Blackthorn Hollow, stood an ancient library untouched by time. Its towering shelves stretched into the shadows, cradling books bound in leather and mystery. The Midnight Library was no ordinary place—it held stories not of fiction, but of lost worlds, buried truths, and destinies yet to be fulfilled. For Emma Carter, a restless dreamer burdened by the monotony of reality, the discovery of this secret haven was both an escape and an invitation. One fateful evening, while seeking shelter from an unexpected storm, she stumbled upon its iron-clad doors. The moment she stepped inside, the air crackled with the scent of aged parchment and ink, and the books whispered—calling her name. Each book she touched unraveled a new reality. A flickering lantern light revealed her reflection on a distant moon, where forgotten civilizations awaited their last chance at redemption. Another page thrust her into a labyrinth of shadows, where time itself was fractured and rewritten. But as Emma delved deeper, she uncovered a chilling truth—the Midnight Library was not merely a gateway to adventure, but a prison for lost souls. And once you opened a book, you could not leave until its story was complete. As Emma navigates through forgotten kingdoms, dystopian ruins, and celestial realms, she realizes that every world holds a piece of herself—a secret she was never meant to uncover. With each turning page, the Library tightens its grip, whispering a question she cannot ignore: Are you the reader… or the next story waiting to be told? Now, Emma must unravel the Midnight Library’s true purpose before she becomes nothing more than ink on its endless pages.`,
    mood: "Mysterious"
  },
  {
    title: "Quantum Leap of Faith",
    protagonist: "Dr. Alex Rodriguez",
    plot: "Dr. Alex Rodriguez had spent his life chasing the impossible. A theoretical physicist obsessed with the mysteries of the multiverse, he had dedicated years to equations that danced on the edge of reality. But it wasn’t until a late-night experiment in his underground lab that theory turned into something far more dangerous. With trembling hands, he activated the Q-Lens, a device designed to map quantum fluctuations between dimensions. Instead, it did something he never anticipated—it allowed him to see into parallel universes. The first glimpse was a flicker of light, a fractured mirror of his own world, shifting and distorting like a half-formed dream. But as he fine-tuned the device, the images sharpened. He saw himself in a thousand variations—an artist, a soldier, a fugitive, a hero. Each reality whispered a secret, and together, they revealed a truth too profound to ignore: the boundary between imagination and reality was thinner than anyone had ever believed. At first, the discovery was exhilarating. Alex watched alternate versions of history unfold—what if Rome never fell? What if humanity reached the stars centuries ago? What if love and war were written by different hands? But then he noticed something unsettling. In every reality, someone—or something—was watching back. When the cracks between worlds started widening, bleeding into his own, Alex realized he had gone too far. His device wasn’t just observing other universes—it was connecting them. And now, a force from beyond the veil was reaching through, desperate to break free. With time unraveling and shadowy echoes of himself emerging from the rift, Alex must make an impossible choice: destroy his greatest invention, or take one final leap of faith—into the unknown. Because somewhere, in a universe yet unseen, the answer to everything was waiting.",
    mood: "Adventurous"
  },
  {
    title: "The Starlight Melody",
    protagonist: "Luna Zhang",
    plot: "Luna Zhang had always felt a pull to the stars. As a young violinist, her music could express the emotions she couldn’t put into words. Yet, despite her talent, something was always missing—an elusive harmony she could never quite capture. Little did she know, the music she played was not just an art form; it was a bridge between realms.One night, under a sky so clear it seemed as if the stars themselves were listening, Luna’s violin began to hum a melody of its own. At first, she thought it was a trick of her imagination, but as the strings vibrated, the sound took on an ethereal quality—like whispers on the wind, voices that spoke in a language older than time. And then, in the quiet night, the impossible happened. The stars above shimmered in response, and a celestial being appeared before her, bathed in radiant light. The being explained that Luna’s violin was no ordinary instrument—it had been crafted by the stars themselves, imbued with the ability to communicate with the celestial beings that guided the cosmos. The melody she played was not just music; it was the language of the universe, capable of healing wounds both physical and spiritual. Now, Luna is tasked with a monumental mission: to orchestrate a symphony using the notes of stardust, one that could heal the world. But as she journeys through forgotten forests, abandoned temples, and ancient cities, she discovers that the world’s darkness is more than just pain—it is a force that resists the light. Enemies lurk in the shadows, determined to silence her symphony before it can be completed. As Luna’s music reaches its crescendo, she must learn the true power of her gift. The violin is more than just a means to heal—it is the key to unlocking a forgotten harmony between the heavens and the earth. And only through the music of the stars can she restore balance to a world teetering on the edge of despair. Will Luna’s melody be enough to heal the world? Or will the silence of the stars be her only legacy?",
    mood: "Magical"
  },
  {
    title: "Echoes of Eternity",
    protagonist: "Kai Nakamura",
    plot: "Kai Nakamura never thought much of the dusty heirloom passed down through his family—the ancient map, yellowed with age and faintly glowing under moonlight. For years, it had been tucked away in an old wooden chest, its mysteries untouched. That was until the night it pulsed in his hands, a whisper of light calling him to follow its path. The map was more than just ink on parchment—it was a doorway to something far beyond the world he knew.As Kai traced the map’s intricate lines, he discovered that it didn’t lead to any earthly destination. It unveiled a portal—hidden in the folds of space and time itself—a gateway to a civilization lost to history, existing on the edges of reality. This civilization, called The Luminaries, was unlike anything Kai had ever imagined. They lived not in a single place, but within the folds of time, moving between centuries, dimensions, and even alternate realities. They were the keepers of forgotten knowledge and the silent architects of history. With each step Kai took on his journey to find them, he found himself slipping further into a world where time didn’t flow in one direction and reality shifted like sand. The sky shimmered with colors that didn’t belong to any known spectrum, and creatures of impossible design greeted him like old friends. His every move seemed guided by a force older than the Earth itself, urging him toward a destiny he never sought but was now entwined with. But as Kai ventured deeper into the heart of this enigmatic world, he uncovered a secret that threatened not just his reality but the very fabric of existence. The Luminaries were in danger of losing their immortality, their place beyond time collapsing into oblivion. The map wasn’t just a guide—it was a warning, a call for help from the past, present, and future, all woven together by the echoes of eternity. To save the Luminaries and the timeline itself, Kai must navigate puzzles that span the ages, interact with beings who exist in multiple forms at once, and ultimately decide whether to preserve the world he knows or embrace a new existence beyond time and space. Can Kai unlock the secrets of the map and restore balance to the universe? Or will the echoes of eternity fade into the silence of forgotten history?",
    mood: "Whimsical"
  },
  {
    title: "The Clockwork Heart",
    protagonist: "Aria Sullivan",
    plot: "Aria Sullivan was a brilliant engineer—one who saw the world not in emotions, but in gears, cogs, and calculations. Her mind was a machine in its own right, always solving problems, always finding solutions. But when she lost her younger brother, Noah, to a tragic accident, a piece of her heart was lost too. In her grief, Aria found herself obsessed with the idea of preserving memories—memories that could never fade, never be erased by time or loss. And so, she created the Clockwork Heart. A masterpiece of her mechanical genius, it was designed to function as both a replacement for the human heart and a vessel to store memories. Unlike the biological heart, which was driven by instinct and emotion, this heart was powered by precision—gears and pistons that could record every moment, every feeling, and every experience. The memory it contained could be played back, relived, and shared at will. At first, the Clockwork Heart was just a project, a creation to honor the memory of Noah. But when Aria implanted it in her own chest, she realized that something unexpected had occurred—the heart did more than store memories. It began to feel. The mechanical heart, with its network of intricate circuits and wires, seemed to learn, adapt, and even simulate emotions. Memories she thought she had lost were brought back in vivid clarity, but they weren’t just memories—they were experiences, sensations that felt just as real as the day they had happened. The boundaries between human emotion and machine precision began to blur. Aria found herself questioning the very nature of what it meant to be human. Was she still Aria Sullivan, or had she become something else—a hybrid of machine and memory, where emotion could be manufactured, but at the cost of authenticity? As the Clockwork Heart continued to evolve, Aria realized it wasn’t just her emotions that were being altered. Others—those who came into contact with the heart—began experiencing the effects. Their own memories, fears, desires, and even personalities began to shift. Aria’s invention had created a ripple effect, one that threatened to unravel the delicate balance between human connection and artificial intelligence. Now, Aria must face the consequences of her creation. Is the Clockwork Heart a gift, a way to preserve the essence of humanity, or is it a curse, a way to strip away the very thing that makes people real? And if the heart can simulate feelings, can it ever truly understand them?",
    mood: "Intriguing"
  },
  {
    title: "Whispers of the Wind",
    protagonist: "Zara Ahmed",
    plot: "Zara Ahmed had always felt a deep connection to the winds that swept through the deserts of her homeland. Born into a family of storytellers and mystics, she was taught to revere the natural world—but never once did she imagine that the wind itself held the key to unlocking ancient secrets long buried beneath the sands. One fateful day, while seeking solitude in the high cliffs that overlooked the vast desert, Zara encountered an unexpected whisper—a voice carried by the wind, soft yet clear. The wind spoke to her in a language only the most attuned could hear, and with it came the revelation of an ancient art passed down through generations: the ability to communicate with wind spirits. Her grandmother, a renowned keeper of family traditions, had once mentioned the lost art in passing, a skill that had been all but forgotten for centuries. But now, Zara realized that the winds held more than just the weather—they held memories, secrets, and stories waiting to be told. As Zara learned the sacred rituals and chants that unlocked the power of the wind spirits, she discovered a world hidden in plain sight. The winds carried more than just whispers of her ancestors’ lives; they carried warnings of a long-forgotten curse that had plagued her bloodline. It was said that her ancestors had sealed away a powerful artifact, one that could reshape the very fabric of reality, but the knowledge of its location had been lost with time. But with every conversation Zara had with the wind, new pieces of the puzzle began to fall into place—ancient symbols, hidden paths, and the truth about the artifact that could either save or destroy her people. She found herself drawn into a race against time, guided by the wind spirits who seemed to possess knowledge not only of her past but of her future. However, the winds were not without their own dangers. Dark forces, intent on wielding the artifact’s power for their own gain, had awakened from their slumber, and they were following the same trail of whispers that Zara was uncovering. The wind, once a gentle guide, began to carry warnings of betrayal, and Zara could no longer trust even those closest to her. To unlock the final secrets of her homeland, Zara must journey to the heart of the desert, where the spirits of the wind and the earth have long been entwined. But as she comes closer to the truth, she is forced to confront a question that will change everything: Is the power of the wind meant to be wielded by mortals, or is it a force too ancient to be controlled?",
    mood: "Mysterious"
  },
  {
    title: "The Quantum Gardener",
    protagonist: "Remi Leclair",
    plot: "Remi Leclair was a dedicated botanist, an expert in plant physiology, with a mind that always sought logical explanations and evidence. Her days were spent studying the growth patterns of plants, carefully cataloging each discovery in the pursuit of knowledge. But despite her achievements, she felt that something was missing—a deeper connection between nature and the universe that she couldn’t quite grasp. One day, while on a research trip in a remote valley, Remi stumbled upon a hidden garden—its existence unknown to even the most seasoned scientists. This garden was unlike any she had ever seen. The air hummed with an energy that seemed to pulse in rhythm with the plants themselves. The flowers glowed with an ethereal light, and the trees whispered with a language older than time. At first, Remi thought it was the result of an unknown species of plant, perhaps a new discovery that could revolutionize her field. But as she began to study the garden, something incredible happened. The plants started to exhibit behaviors that defied all logical explanation. They would bloom in response to her thoughts, react to her emotions, and most astonishingly, they began to show signs of predicting the future. It began with small events—flowers blooming just before it rained, or vines growing in patterns that mirrored the outcomes of chance encounters. But as Remi spent more time in the garden, she discovered that the plants could predict much larger events: the rise and fall of empires, the future of human inventions, even the course of her own life. Each leaf seemed to hold a fragment of a possible future, each vine was a thread connecting what was to come. Intrigued and awed, Remi realized she had discovered something far greater than botanical science—it was a mystical art of prediction, a garden that bridged the quantum realm and the natural world. The plants, by their very nature, were attuned to the subtle fluctuations of time and reality, acting as conduits for glimpsing possible futures. But with this newfound power came consequences. Remi found herself torn between using the garden’s knowledge to predict scientific breakthroughs or to intervene in the personal lives of those she loved. The plants were not always accurate, and their predictions were often shaped by the choices made in the present, creating a web of potential futures that she could not fully control. As she delved deeper into the mysteries of the garden, Remi realized that her ability to predict the future was not without its own dangers. There were others—people who sought to exploit the garden’s power for personal gain, and who were willing to destroy everything Remi held dear to harness its secrets. The garden, it seemed, had its own way of protecting itself, sometimes in ways that Remi couldn’t understand. Now, Remi must navigate a path where science and magic collide, balancing the responsibility of knowing the future with the risks of altering it. Will she use the garden’s power to guide humanity to a better future, or will she discover that some mysteries of the natural world are better left unexplored?",
    mood: "Magical"
  },
  {
    title: "Shadows of Synchronicity",
    protagonist: "Marcus Green",
    plot: "Marcus Green had always been a skeptic—pragmatic, logical, and driven by reason. He spent his life as a journalist, uncovering stories, following leads, and meticulously documenting events. But nothing in his years of reporting could prepare him for what he stumbled upon one rainy evening, when a simple coincidence led him to the discovery of something far more complex than he could ever have imagined. It began with a story—a seemingly insignificant story about a missing person. Marcus, in his usual fashion, dug deeper. As he connected dots between different accounts, he began to notice something strange: a pattern of coincidences that linked people, places, and events in ways that defied explanation. Small, unrelated occurrences that, when viewed together, created a tapestry of meaning—too precise, too orchestrated to be the result of mere chance. At first, Marcus chalked it up to coincidence, but as the threads unraveled, the connections grew too intricate to ignore. A conversation with a taxi driver that led him to meet a missing woman, whose disappearance was connected to an international organization that appeared in his past stories—these weren’t coincidences; they were synchronicities, a web of events carefully woven together across time and space. The deeper Marcus dug, the more he uncovered: a hidden network, an intelligence that seemed to be guiding humanity’s every move. It was as though a greater force was behind the scenes, nudging people toward their fates, influencing key events, and creating a path that only a few could glimpse. As the synchronicities grew, Marcus began to feel as though he was being pulled into a narrative much larger than his own—a narrative where his every step had already been written. Every lead he followed seemed to connect to another mystery, each puzzle piece locking into place with terrifying accuracy. He encountered individuals who seemed to know him before he ever met them, situations that mirrored his own life in uncanny ways, and warnings from strange figures who spoke in riddles and left cryptic messages in their wake. The more Marcus learned, the more he began to question everything he had once believed: Was there truly a higher intelligence guiding human destiny, or was he simply caught in the web of his own mind, imagining patterns that didn’t exist? His journalistic instincts told him to investigate further, but the closer he got to the truth, the more dangerous the trail became. Those who were involved in the hidden network weren’t simply pulling strings—they were protecting something, something ancient and powerful. Now, Marcus finds himself at a crossroads. He must decide whether to continue his pursuit of the truth, even if it means uncovering a secret so profound that it could change the course of human history, or to walk away, knowing that the shadows of synchronicity have already set his destiny in motion.",
    mood: "Adventurous"
  },
  {
    title: "The Memory Weaver",
    protagonist: "Sophia Kim",
    plot: "Sophia Kim was a brilliant neuroscientist who spent her days pushing the boundaries of memory research. For years, she had been obsessed with the idea that human memories were more than just fleeting electrical signals in the brain; they were the threads that wove the very fabric of a person’s identity. Yet, despite her success in understanding the mechanisms of memory, she couldn’t shake the feeling that something fundamental was missing—the ability to truly reconstruct and experience lost memories. After years of research, she finally achieved what many thought impossible: a technology that could reconstruct lost memories with stunning clarity. It was a neural interface that allowed people to access and relive memories that had long been forgotten, whether by trauma, time, or simply the passage of life. The implications were profound—no longer would people need to live with the absence of their past, or the pain of forgotten moments. However, as Sophia delved deeper into the technology, she began to encounter something unexpected: the memories were not just fragments of the past, but living, breathing entities. The memories seemed to have their own energy, their own life force. As people accessed their lost memories, they found themselves not only reliving experiences but becoming part of those moments again. The memories themselves were not static—they were dynamic, shifting, and sometimes... dangerous. One of her earliest test subjects, a man who had forgotten the details of a traumatic event, found that his reconstructed memory began to evolve on its own. What was once a painful recollection of loss turned into a vivid dreamlike experience—one where the lines between past and present blurred, and the memory began to reveal hidden truths he hadn’t even known existed. He became trapped in the memory, unable to distinguish what was real from what had been reconstructed. Sophia realized that the technology was doing more than just bringing memories back—it was reshaping them, sometimes in unpredictable and unsettling ways. As more people began using the technology, Sophia saw a new pattern emerge. The memories were interwoven, not just with the people who experienced them, but with the very fabric of human history itself. Forgotten events from centuries ago, suppressed histories, and lost knowledge began to resurface, pulling Sophia into a web of interconnected stories that spanned generations. It became clear that the memories were not isolated moments—they were pieces of a larger, more intricate narrative that transcended individual lives. But with these discoveries came a darker truth. The fabric of human experience was fragile, and the ability to manipulate memories had unintended consequences. People who used the technology too often found themselves losing their sense of self, becoming fragmented versions of who they had once been. The more they tried to piece together their pasts, the more they unraveled their futures. And some memories, it seemed, were never meant to be unearthed. As Sophia uncovered the deeper layers of memory, she realized that her invention had uncovered more than just lost moments—it had opened a door to a hidden world of forgotten histories, long buried for reasons she could not yet understand. Someone—or something—was pulling the strings, manipulating memories for a purpose far greater than anyone had anticipated. Now, Sophia must confront the question: What happens when we begin to unravel the very thing that makes us human—the memories that define us? Is the truth worth the price of losing one’s identity, or is some knowledge better left forgotten?",
    mood: "Intriguing"
  },
  {
    title: "Celestial Compass",
    protagonist: "Noah Alvarez",
    plot: "Noah Alvarez was a seasoned explorer, known for his daring adventures and unshakable curiosity about the world. From remote jungles to forgotten ruins, he had traversed every corner of the Earth in search of hidden wonders. But even he couldn’t have prepared for the discovery he made one fateful afternoon in a dusty old market in an ancient city. Tucked away in a corner, beneath layers of antique maps and weathered trinkets, Noah stumbled upon a peculiar object—an old, ornate compass that seemed to hum with an energy all its own. Its needle was not fixed in any direction, but instead spun with a life of its own, swirling aimlessly as if guided by invisible forces. The shopkeeper, an elderly man with a cryptic smile, told Noah that this compass was no ordinary tool—it was a Celestial Compass, capable of navigating dimensional rifts and opening pathways to unexplored realms of existence. At first, Noah dismissed it as a fanciful legend, but the allure of its mystery gnawed at him. On a whim, he purchased the compass, and that night, he tested it. To his shock, as he held it in his hand, the compass began to glow, its needle locking into a direction that defied logic. Without thinking, he followed its pull, and as he stepped forward, the air around him seemed to warp and shift. In an instant, he was no longer in his small, cluttered apartment—but standing on the edge of an impossible world. Noah had crossed a dimensional rift. The Celestial Compass had opened a pathway to a realm unlike any he had ever imagined—a world of floating islands, endless skies, and cities that existed in impossible shapes and sizes. The laws of physics seemed to bend here, and time flowed differently. There were realms filled with crystalline forests that sang, oceans of light that rippled with stars, and mountains made of solid clouds. Each world was stranger than the last, offering mysteries that beckoned Noah deeper into the unknown. As Noah navigated these unexplored realms, he began to realize that the Celestial Compass was not just a tool for discovery—it was a guide to unlocking the secrets of existence itself. Each new realm revealed something about the universe’s hidden layers: ancient civilizations that had transcended time, creatures that existed between dimensions, and forgotten histories that spanned across worlds. But the more Noah explored, the more he discovered that the Compass had its own purpose—one that transcended his understanding. It was not just opening doorways to new worlds, but rewriting the fabric of reality itself. With every step Noah took, the boundaries between the realms began to blur, and strange forces—ancient guardians of the realms—started to take notice of him. Some sought to protect the Compass’s power, while others wanted to seize it for themselves. Now, Noah is faced with a dilemma: Should he continue his quest to explore these realms, uncovering the secrets of the universe and learning more than any human has ever known? Or should he put the Compass to rest, knowing that such power comes with a dangerous cost? Every journey he takes might lead him further into the unknown, but each new discovery also threatens to unravel the very fabric of reality itself. With the Celestial Compass in hand, Noah must decide whether to follow the whimsical adventure it promises or heed the warnings of those who have tried—and failed—to control its power. The realms are waiting, and the compass’s true purpose may be far greater than he could ever imagine.",
    mood: "Whimsical"
  }
];

const CatchableBall = () => {
  const [ballSize, setBallSize] = useState(64);
  const x = useMotionValue(0);
  const y = useMotionValue(0);


  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth < 768 ? 48 : 64;
      setBallSize(newSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (event, info) => {
    animate(x, info.point.x, { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    });
    animate(y, info.point.y, { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    });
  };

  return (
    <motion.div
      drag
      dragConstraints={{ 
        left: 0, 
        right: window.innerWidth, 
        top: 0, 
        bottom: window.innerHeight 
      }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
      className={`fixed bottom-10 right-10 bg-purple-500 rounded-full cursor-grab active:cursor-grabbing z-50 
        sm:w-12 sm:h-12 
        md:w-14 md:h-14 
        lg:w-16 lg:h-16 
        xl:w-16 xl:h-16`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  );
};

// Story Generator Component
const StoryGenerator = () => {
  const [story, setStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStory = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const randomStory = STORIES[Math.floor(Math.random() * STORIES.length)];
      setStory(randomStory);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-200 relative overflow-hidden flex align-middle justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10"
      >
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto 
          bg-white/80 backdrop-blur-md rounded-xl shadow-2xl 
          p-4 sm:p-6 md:p-8 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Camera className="text-purple-600 mr-2 sm:mr-3 
              w-6 h-6 sm:w-8 sm:h-8 
              md:w-10 md:h-10 
              lg:w-10 lg:h-10" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800">
              Storybook Generator
            </h1>
          </div>

          {/* Story Display */}
          {story && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 p-4 sm:p-5 md:p-6 lg:p-6 rounded-lg shadow-md mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-purple-700 mb-2 sm:mb-4">
                {story.title}
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-700 mb-2 sm:mb-4">
                <strong>Protagonist:</strong> {story.protagonist}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 italic">
                {story.plot}
              </p>
              <div className="mt-2 sm:mt-4 flex justify-between items-center">
                <span className="text-xs sm:text-sm bg-purple-100 text-purple-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                  {story.mood} Mood
                </span>
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateStory}
            disabled={isGenerating}
            className={`w-full flex items-center justify-center 
              py-2 sm:py-3 md:py-3 lg:py-3 
              text-sm sm:text-base md:text-base lg:text-base 
              rounded-full 
              ${isGenerating 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600'
              } transition-all duration-300 ease-in-out`}
          >
            {isGenerating ? 'Generating...' : 'Generate Story'}
          </motion.button>
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -100,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 100,
              x: Math.random() * window.innerWidth,
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-purple-300 rounded-full"
          />
        ))}
      </motion.div>

      {/* Catchable Ball */}
      <CatchableBall />
    </div>
  );
};

export default StoryGenerator;