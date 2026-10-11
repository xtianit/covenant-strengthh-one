import logo from "./assets/logo.png";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
    BookOpen,
    Award,
    CheckCircle,
    X,
    Lock,
    Unlock,
    Sparkles,
    Shield,
    Compass,
    MessageSquare,
    Send,
    Volume2,
    VolumeX,
    Bookmark,
    BookmarkCheck,
    FileText,
    Trophy,
    Star,
    Target,
    Zap,
    Heart,
    Download,
    BarChart2,
    Medal,
    Users,
    CheckSquare,
    Settings,
    Save
} from "lucide-react";

// Initialize Supabase Client
const SUPABASE_URL = "https://oypggoucddfkoabkgfql.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mY3mE66Qnkuuq2xSeVm_OQ_QTvzLN1W";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface PaystackResponse {
    reference: string;
    status: string;
    message: string;
    trans: string;
    transaction: string;
    trxref: string;
}

declare global {
    interface Window {
        PaystackPop: {
            setup: (config: {
                key: string;
                email: string;
                amount: number;
                currency: string;
                reference: string;
                onClose: () => void;
                callback: (response: PaystackResponse) => void;
            }) => { openIframe: () => void };
        };
    }
}

type BibleVersions = {
    KJV: string;
    NKJV: string;
    NIV: string;
    ESV: string;
    AMP: string;
    NLT: string;
};

type ScriptureDB = Record<string, BibleVersions>;

interface ChatMessage {
    id?: string;
    user_name: string;
    message: string;
    created_at?: string;
}

interface LeaderboardEntry {
    id?: string;
    user_name: string;
    score: number;
    created_at?: string;
}

interface AttendanceEntry {
    id?: string;
    user_name: string;
    class_name: string;
    created_at?: string;
}

const initialScriptureDB: ScriptureDB = {
    "Mark 3:27": {
        KJV: "27 No man can enter into a strong man's house, and spoil his goods, except he will first bind the strong man; and then he will spoil his house.",
        NKJV: "27 No one can enter a strong man’s house and plunder his goods, unless he first binds the strong man. And then he will plunder his house.",
        NIV: "27 In fact, no one can enter a strong man’s house without first tying him up. Then he can plunder the strong man’s house.",
        ESV: "27 But no one can enter a strong man's house and plunder his goods, unless he first binds the strong man. Then indeed he may plunder his house.",
        AMP: "27 But no one can enter a strong man’s house and plunder his property unless he first binds the strong man; then he will plunder his house.",
        NLT: "27 Let me illustrate this further. Who is powerful enough to enter the house of a strong man and plunder his goods? Only someone even stronger—someone who could tie him up and then plunder his house."
    },
    "Romans 13:1-5": {
        KJV: "1 Let every soul be subject unto the higher powers. For there is no power but of God: the powers that be are ordained of God. 2 Whosoever therefore resisteth the power, resisteth the ordinance of God: and they that resist shall receive to themselves damnation. 3 For rulers are not a terror to good works, but to the evil. Wilt thou then not be afraid of the power? do that which is good, and thou shalt have praise of the same. 4 For he is the minister of God to thee for good. But if thou do that which is evil, be afraid; for he beareth not the sword in vain: for he is the minister of God, a revenger to execute wrath upon him that doeth evil. 5 Wherefore ye must needs be subject, not only for wrath, but also for conscience sake.",
        NKJV: "1 Let every soul be subject to the governing authorities. For there is no authority except from God, and the authorities that exist are appointed by God. 2 Therefore whoever resists the authority resists the ordinance of God, and those who resist will bring judgment on themselves. 3 For rulers are not a terror to good works, but to evil. Do you want to be unafraid of the authority? Do what is good, and you will have praise from the same. 4 For he is God's minister to you for good. But if you do evil, be afraid; for he does not bear the sword in vain; for he is God's minister, an avenger to execute wrath on him who practices evil. 5 Therefore you must be subject, not only because of wrath but also for conscience' sake.",
        NIV: "1 Let everyone be subject to the governing authorities, for there is no authority except that which God has established. The authorities that exist have been established by God. 2 Consequently, whoever rebels against the authority is rebelling against what God has instituted, and those who do so will bring judgment on themselves. 3 For rulers hold no terror for those who do right, but for those who do wrong. Do you want to be free from fear of the one in authority? Then do what is right and you will be commended. 4 For the one in authority is God’s servant for your good. But if you do wrong, be afraid, for rulers do not bear the sword for no reason. They are God’s servants, agents of wrath to bring punishment on the wrongdoer. 5 Therefore, it is necessary to submit to the authorities, not only because of possible punishment but also as a matter of conscience.",
        ESV: "1 Let every person be subject to the governing authorities. For there is no authority except from God, and those that exist have been instituted by God. 2 Therefore whoever resists the authorities resists what God has appointed, and those who resist will incur judgment. 3 For rulers are not a terror to good conduct, but to bad. Would you have no fear of the one who is in authority? Then do what is good, and you will receive his approval, 4 for he is God’s servant for your good. But if you do wrong, be afraid, for he does not bear the sword in vain. For he is the servant of God, an avenger who carries out God’s wrath on the wrongdoer. 5 Therefore one must be in subjection, not only to avoid God’s wrath but also for the sake of conscience.",
        AMP: "1 Let every person be in subjection to the governing authorities, for there is no authority except from God, and the authorities that exist are appointed by God. 2 Therefore whoever resists authority is resisting what God has appointed, and those who resist will bring judgment on themselves. 3 For rulers are not a terror to those who do good, but to those who do evil. Would you like to be unafraid of the authority? Do what is good, and you will have approval. 4 For the one in authority is God’s servant for your good. But if you do evil, be afraid, for he does not bear the sword in vain; he is God’s servant, an agent of wrath to bring punishment on the wrongdoer. 5 Therefore, you must be in subjection, not only because of wrath but also for conscience’ sake.",
        NLT: "1 Everyone must submit to governing authorities. For all authority comes from God, and those in positions of power have been placed there by God. 2 So anyone who rebels against authority is rebelling against what God has instituted, and they will be punished. 3 For the authorities do not strike fear in people who are doing right, but in those who are doing wrong. Would you like to live free from fear of the authorities? Then do what is right, and they will honor you. 4 The authorities are God’s servants, sent for your good. But if you do wrong, you should be afraid, for they have the power to punish you. They are God’s servants, sent for the very purpose of punishing those who do evil. 5 So you must submit to them, not only to avoid punishment, but also to keep your conscience clear."
    },
    "Genesis 2:15-17": {
        KJV: "15 And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it. 16 And the Lord God commanded the man, saying, Of every tree of the garden thou mayest freely eat: 17 But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.",
        NKJV: "15 Then the Lord God took the man and put him in the garden of Eden to tend and keep it. 16 And the Lord God commanded the man, saying, 'Of every tree of the garden you may freely eat; 17 but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.'",
        NIV: "15 The Lord God took the man and put him in the Garden of Eden to work it and take care of it. 16 And the Lord God commanded the man, 'You are free to eat from any tree in the garden; 17 but you must not eat from the tree of the knowledge of good and evil, for when you eat from it you will certainly die.'",
        ESV: "15 The Lord God took the man and put him in the garden of Eden to work it and keep it. 16 And the Lord God commanded the man, saying, 'You may surely eat of every tree of the garden, 17 but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.'",
        AMP: "15 So the Lord God took the man [He had made] and settled him in the Garden of Eden to cultivate and keep it. 16 And the Lord God commanded the man, saying, 'You may freely (unconditionally) eat the fruit from every tree of the garden; 17 but [only] from the tree of the knowledge (recognition) of good and evil you shall not eat, otherwise on the day that you eat from it, you shall most certainly die [because of your disobedience].'",
        NLT: "15 The Lord God placed the man in the Garden of Eden to tend and watch over it. 16 But the Lord God warned him, 'You may freely eat the fruit of every tree in the garden— 17 except the tree of the knowledge of good and evil. If you eat its fruit, you are sure to die.'"
    },
    "Genesis 9:8-9": {
        KJV: "8 And God spake unto Noah, and to his sons with him, saying, 9 And I, behold, I establish my covenant with you, and with your seed after you;",
        NKJV: "8 Then God spoke to Noah and to his sons with him, saying: 9 'And as for Me, behold, I establish My covenant with you and with your descendants after you,'",
        NIV: "8 Then God said to Noah and to his sons with him: 9 'I now establish my covenant with you and with your descendants after you,'",
        ESV: "8 Then God said to Noah and to his sons with him, 9 'Behold, I establish my covenant with you and your offspring after you,'",
        AMP: "8 Then God spoke to Noah and to his sons with him, saying, 9 'Now behold, I am establishing My covenant with you and with your descendants after you,'",
        NLT: "8 Then God told Noah and his sons, 9 'I hereby confirm my covenant with you and your descendants,'"
    },
    "Genesis 17:9": {
        KJV: "9 And God said unto Abraham, Thou shalt keep my covenant therefore, thou, and thy seed after thee in their generations.",
        NKJV: "9 And God said to Abraham: 'As for you, you shall keep My covenant, you and your descendants after you throughout their generations.'",
        NIV: "9 Then God said to Abraham, 'As for you, you must keep my covenant, you and your descendants after you for the generations to come.'",
        ESV: "9 And God said to Abraham, 'As for you, you shall keep my covenant, you and your offspring after you throughout their generations.'",
        AMP: "9 God said further to Abraham, 'As for you, you shall keep My covenant, you and your descendants after you throughout their generations.'",
        NLT: "9 Then God said to Abraham, 'Your responsibility is to obey the terms of the covenant. You and all your descendants have this continual responsibility.'"
    },
    "Genesis 17:19": {
        KJV: "19 And God said, Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac: and I will establish my covenant with him for an everlasting covenant, and with his seed after him.",
        NKJV: "19 Then God said: 'No, Sarah your wife shall bear you a son, and you shall call his name Isaac; I will establish My covenant with him for an everlasting covenant, and with his descendants after him.'",
        NIV: "19 Then God said, 'Yes, but your wife Sarah will bear you a son, and you will call him Isaac. I will establish my covenant with him as an everlasting covenant for his descendants after him.'",
        ESV: "19 God said, 'No, but Sarah your wife shall bear you a son, and you shall call his name Isaac. I will establish my covenant with him as an everlasting covenant for his offspring after him.'",
        AMP: "19 But God said, 'No; Sarah your wife will bear you a son indeed, and you shall name him Isaac; and I will establish My covenant with him for an everlasting covenant, for his descendants after him.'",
        NLT: "19 But God replied, 'No—Sarah, your wife, will give birth to a son for you. You will name him Isaac, and I will confirm my covenant with him and his descendants as an everlasting covenant.'"
    },
    "Exodus 24:6-8": {
        KJV: "6 And Moses took half of the blood, and put it in basons; and half of the blood he sprinkled on the altar. 7 And he took the book of the covenant, and read in the audience of the people: and they said, All that the Lord hath said will we do, and be obedient. 8 And Moses took the blood, and sprinkled it on the people, and said, Behold the blood of the covenant, which the Lord hath made with you concerning all these words.",
        NKJV: "6 And Moses took half the blood and put it in basins, and half the blood he sprinkled on the altar. 7 Then he took the Book of the Covenant and read in the hearing of the people. And they said, 'All that the Lord has said we will do, and be obedient.' 8 And Moses took the blood, sprinkled it on the people, and said, 'This is the blood of the covenant which the Lord has made with you according to all these words.'",
        NIV: "6 Moses took half of the blood and put it in bowls, and the other half he splashed against the altar. 7 Then he took the Book of the Covenant and read it to the people. They responded, 'We will do everything the Lord has said; we will obey.' 8 Moses then took the blood, sprinkled it on the people and said, 'This is the blood of the covenant that the Lord has made with you in accordance with all these words.'",
        ESV: "6 And Moses took half of the blood and put it in basins, and half of the blood he threw against the altar. 7 Then he took the Book of the Covenant and read it in the hearing of the people. And they said, 'All that the Lord has spoken we will do, and we will be obedient.' 8 And Moses took the blood and threw it on the people and said, 'Behold the blood of the covenant that the Lord has made with you in accordance with all these words.'",
        AMP: "6 Moses took half of the blood and put it in basins, and the other half of the blood he sprinkled on the altar. 7 Then he took the Book of the Covenant and read it in the hearing of the people, and they said, 'All that the Lord has spoken we will do, and we will be obedient.' 8 So Moses took the blood and sprinkled it on the people, and said, 'Behold the blood of the covenant which the Lord has made with you in accordance with all these words.'",
        NLT: "6 Moses drained half the blood from these animals into basins. The other half he splattered against the altar. 7 Then he took the Book of the Covenant and read it aloud to the people. Again they all responded, 'We will do everything the Lord has commanded. We will obey.' 8 Then Moses took the blood from the basins and splattered it over the people, declaring, 'Look, this blood confirms the covenant the Lord has made with you in giving you these instructions.'"
    },
    "Joshua 9:14-19": {
        KJV: "14 And the men took of their victuals, and asked not counsel at the mouth of the Lord. 15 And Joshua made peace with them, and made a league with them, to let them live: and the princes of the congregation sware unto them. 16 And it came to pass at the end of three days after they had made a league with them, that they heard that they were their neighbours, and that they dwelt among them. 17 And the children of Israel journeyed, and came unto their cities on the third day. Now their cities were Gibeon, and Chephirah, and Beeroth, and Kirjathjearim. 18 And the children of Israel smote them not, because the princes of the congregation had sworn unto them by the Lord God of Israel. And all the congregation murmured against the princes. 19 But all the princes said unto all the congregation, We have sworn unto them by the Lord God of Israel: now therefore we may not touch them.",
        NKJV: "14 Then the men of Israel took some of their provisions; but they did not ask counsel of the Lord. 15 So Joshua made peace with them, and made a covenant with them to let them live; and the rulers of the congregation swore to them. 16 And it happened at the end of three days, after they had made a covenant with them, that they heard that they were their neighbors who dwelt near them. 17 Then the children of Israel journeyed and came to their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kirjath Jearim. 18 But the children of Israel did not attack them, because the rulers of the congregation had sworn to them by the Lord God of Israel. And all the congregation complained against the rulers. 19 Then all the rulers said to all the congregation, 'We have sworn to them by the Lord God of Israel; now therefore, we may not touch them.'",
        NIV: "14 The Israelites sampled their provisions but did not inquire of the Lord. 15 Then Joshua made a treaty of peace with them to let them live, and the leaders of the assembly ratified it by oath. 16 Three days after they made the treaty with the Gibeonites, the Israelites heard that they were neighbors, living near them. 17 So the Israelites set out and on the third day came to their cities: Gibeon, Kephirah, Beeroth and Kiriath Jearim. 18 But the Israelites did not attack them, because the leaders of the assembly had sworn an oath to them by the Lord, the God of Israel. The whole assembly grumbled against the leaders. 19 But all the leaders answered, 'We have given them our oath by the Lord, the God of Israel, and we cannot touch them now.'",
        ESV: "14 So the men took some of their provisions, but did not ask counsel from the Lord. 15 And Joshua made peace with them and made a covenant with them, to let them live, and the leaders of the congregation swore to them. 16 But at the end of three days after they had made a covenant with them, they heard that they were their neighbors and that they lived among them. 17 And the people of Israel set out and reached their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kiriath-jearim. 18 But the people of Israel did not attack them, because the leaders of the congregation had sworn to them by the Lord, the God of Israel. Then all the congregation murmured against the leaders. 19 But all the leaders said to all the congregation, 'We have sworn to them by the Lord, the God of Israel, and now we may not touch them.'",
        AMP: "14 So the men [of Israel] took some of their own provisions [and offered them in friendship], and did not ask for the counsel of the Lord. 15 Joshua made peace with them and made a covenant with them, to let them live, and the leaders of the congregation swore an oath to them. 16 It happened that after they had made a covenant with them, they heard that they were actually their neighbors and lived among them. 17 Then the sons of Israel set out and came to their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kiriath-jearim. 18 The sons of Israel did not kill them because the leaders of the congregation had sworn an oath to them by the Lord, the God of Israel. And all the congregation murmured against the leaders. 19 But all the leaders said to all the congregation, 'We have sworn an oath to them by the Lord, the God of Israel, and now we cannot touch them.'",
        NLT: "14 So the Israelites examined their food, but they did not consult the Lord. 15 Then Joshua made a peace treaty with them and guaranteed their safety, and the leaders of the community ratified their agreement with a binding oath. 16 Three days after making the treaty, they learned that these people actually lived nearby! 17 The Israelites set out at once to investigate and reached their towns in three days. The towns were Gibeon, Kephirah, Beeroth, and Kiriath-jearim. 18 But the Israelites did not attack the towns, for the Israelite leaders had made a vow to them in the name of the Lord, the God of Israel. The people of Israel grumbled against the leaders because of the treaty. 19 But the leaders replied, 'Since we have sworn an oath in the presence of the Lord, the God of Israel, we cannot touch them.'"
    },
    "2 Samuel 21:1-9": {
        KJV: "1 Then there was a famine in the days of David three years, year after year; and David enquired of the Lord. And the Lord answered, It is for Saul, and for his bloody house, because he slew the Gibeonites. 2 And the king called the Gibeonites, and said unto them; (now the Gibeonites were not of the children of Israel, but of the remnant of the Amorites; and the children of Israel had sworn unto them: and Saul sought to slay them in his zeal to the children of Israel and Judah.) 3 Wherefore David said unto the Gibeonites, What shall I do for you? and wherewith shall I make the atonement, that ye may bless the inheritance of the Lord? 4 And the Gibeonites said unto him, We will have no silver nor gold of Saul, nor of his house; neither for us shalt thou kill any man in Israel. And he said, What ye shall say, that will I do for you. 5 And they answered the king, The man that consumed us, and that devised against us that we should be destroyed from remaining in any of the coasts of Israel, 6 Let seven men of his sons be delivered unto us, and we will hang them up unto the Lord in Gibeah of Saul, whom the Lord did choose. And the king said, I will give them. 7 But the king spared Mephibosheth, the son of Jonathan the son of Saul, because of the Lord's oath that was between them, between David and Jonathan the son of Saul. 8 But the king took the two sons of Rizpah the daughter of Aiah, whom she bare unto Saul, Armoni and Mephibosheth; and the five sons of Michal the daughter of Saul, whom she brought up for Adriel the son of Barzillai the Meholathite: 9 And he delivered them into the hands of the Gibeonites, and they hanged them in the hill before the Lord: and they fell all seven together, and were put to death in the days of harvest, in the first days, in the beginning of barley harvest.",
        NKJV: "1 Now there was a famine in the days of David for three years, year after year; and David inquired of the Lord. And the Lord answered, 'It is because of Saul and his bloodthirsty house, because he killed the Gibeonites.' 2 So the king called the Gibeonites and spoke to them. (Now the Gibeonites were not of the children of Israel, but of the remnant of the Amorites; the children of Israel had sworn protection to them, but Saul had sought to kill them in his zeal for the children of Israel and Judah.) 3 Therefore David said to the Gibeonites, 'What shall I do for you? And with what shall I make atonement, that you may bless the inheritance of the Lord?' 4 And the Gibeonites said to him, 'We will have no silver or gold from Saul or from his house, nor shall you kill any man in Israel for us.' So he said, 'Whatever you say, I will do for you.' 5 Then they answered the king, 'As for the man who consumed us and plotted against us, that we should be destroyed from remaining in any of the territories of Israel, 6 let seven men of his descendants be delivered to us, and we will hang them before the Lord in Gibeah of Saul, whom the Lord chose.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth the son of Jonathan, the son of Saul, because of the Lord’s oath that was between them, between David and Jonathan the son of Saul. 8 So the king took Armoni and Mephibosheth, the two sons of Rizpah the daughter of Aiah, whom she bore to Saul, and the five sons of Michal the daughter of Saul, whom she brought up for Adriel the son of Barzillai the Meholathite; 9 and he delivered them into the hands of the Gibeonites, and they hanged them on the hill before the Lord. So they fell, all seven together, and were put to death in the days of harvest, in the first days, in the beginning of barley harvest.",
        NIV: "1 During the reign of David, there was a famine for three successive years; so David sought the face of the Lord. The Lord said, 'It is on account of Saul and his blood-stained house; it is because he put the Gibeonites to death.' 2 The king summoned the Gibeonites and spoke to them. (Now the Gibeonites were not Israelites, but a remnant of the Amorites; the Israelites had sworn to spare them, but Saul in his zeal for Israel and Judah had tried to annihilate them.) 3 David asked the Gibeonites, 'What shall I do for you? How shall I make atonement so that you will bless the Lord’s inheritance?' 4 The Gibeonites answered him, 'We have no right to demand silver or gold from Saul or his family, nor do we have the right to put anyone in Israel to death.' 'What do you want me to do for you?' David asked. 5 They answered the king, 'As for the man who destroyed us and plotted against us so that we have been decimated and have no place anywhere in Israel, 6 let seven of his male descendants be given to us to be killed and exposed before the Lord at Gibeah of Saul—the Lord’s chosen one.' So the king said, 'I will give them.' 7 The king spared Mephibosheth son of Jonathan, the son of Saul, because of the oath before the Lord between David and Jonathan son of Saul. 8 But the king took Armoni and Mephibosheth, the two sons of Rizpah daughter of Aiah, whom she had borne to Saul, together with the five sons of Saul’s daughter Merab, whom she had borne to Adriel son of Barzillai the Meholathite. 9 He handed them over to the Gibeonites, who killed them and exposed them on a hill before the Lord. All seven of them fell together; they were put to death during the first days of the harvest, just as the barley harvest was beginning.",
        ESV: "1 Now there was a famine in the days of David for three years, year after year. And David sought the face of the Lord. And the Lord said, 'There is bloodguilt on Saul and on his house, because he put the Gibeonites to death.' 2 So the king called the Gibeonites and spoke to them. Now the Gibeonites were not of the people of Israel but of the remnant of the Amorites. Although the people of Israel had sworn to spare them, Saul had sought to strike them down in his zeal for the people of Israel and Judah. 3 And David said to the Gibeonites, 'What shall I do for you? And how shall I make atonement, that you may bless the heritage of the Lord?' 4 The Gibeonites said to him, 'It is not a matter of silver or gold between us and Saul or his house; neither is it for us to put any man to death in Israel.' And he said, 'What do you say that I shall do for you?' 5 They said to the king, 'The man who consumed us and planned to destroy us, so that we should have no place in all the territory of Israel, 6 let seven of his sons be given to us, so that we may hang them before the Lord at Gibeah of Saul, the chosen of the Lord.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth, the son of Jonathan, the son of Saul, because of the oath of the Lord that was between them, between David and Jonathan the son of Saul. 8 The king took the two sons of Rizpah the daughter of Aiah, whom she bore to Saul, Armoni and Mephibosheth, and the five sons of Merab the daughter of Saul, whom she bore to Adriel the son of Barzillai the Meholathite; 9 and he gave them into the hands of the Gibeonites, and they hanged them on the mountain before the Lord. And the seven of them perished together. They were put to death in the first days of harvest, at the beginning of barley harvest.",
        AMP: "1 There was a three-year famine during the days of David, year after year; and David sought the face of the Lord. The Lord said, 'It is because of Saul and his bloody house, because he killed the Gibeonites.' 2 So the king called the Gibeonites and spoke to them. (Now the Gibeonites were not Israelites, but rather a remnant of the Amorites. The Israelites had sworn an oath to spare them, but Saul had sought to strike them down in his zeal for the people of Israel and Judah.) 3 So David said to the Gibeonites, 'What should I do for you? How can I make atonement so that you may bless the inheritance of the Lord?' 4 The Gibeonites said to him, 'We have no right to demand silver or gold from Saul or from his house, nor do we have the right to put any man to death in Israel.' David said, 'I will do for you whatever you say.' 5 They said to the king, 'The man who consumed us and planned to destroy us so that we would have no place anywhere in Israel, 6 let seven of his descendants be handed over to us so that we may hang them before the Lord in Gibeah of Saul, the chosen of the Lord.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth the son of Jonathan, the son of Saul, because of the oath of the Lord that was between them, between David and Jonathan the son of Saul. 8 So the king took Armoni and Mephibosheth, the two sons of Rizpah daughter of Aiah, whom she bore to Saul, together with the five sons of Merab daughter of Saul, whom she bore to Adriel son of Barzillai the Meholathite. 9 He handed them over to the Gibeonites, and they hanged them on the mountain before the Lord; all seven of them fell together and were put to death in the first days of the harvest, at the beginning of the barley harvest.",
        NLT: "1 There was a famine during David’s reign that lasted for three years, so David asked the Lord about it. And the Lord said, 'The famine has come because Saul and his family are guilty of murdering the Gibeonites.' 2 So the king summoned the Gibeonites. (They were not part of Israel but were all that was left of the nation of the Amorites. Israel had sworn not to kill them, but Saul, in his zeal for Israel and Judah, had tried to wipe them out.) 3 David asked them, 'What can I do for you? How can I make amends so that you will bless the Lord’s people again?' 4 'Well, money won’t do,' the Gibeonites replied. 'And we don’t want to see Israelites executed.' 'What can I do then?' David asked. 'Just tell me and I will do it for you.' 5 Then they replied, 'It was Saul who planned to destroy us, to keep us from having any place at all in the territory of Israel. 6 So let seven of Saul’s sons be handed over to us, and we will execute them before the Lord at Gibeah of Saul, the Lord’s chosen one.' 'All right,' the king said, 'I will do it.' 7 The king spared Mephibosheth, the grandson of Saul, because of the oath that David and Jonathan had sworn before the Lord. 8 But he gave them Saul’s two sons—Armoni and Mephibosheth, whose mother was Rizpah daughter of Aiah. He also gave them the five sons of Saul’s daughter Merab, the wife of Adriel son of Barzillai from Meholah. 9 The men of Gibeon executed them on the mountain before the Lord. So all seven of them died together at the beginning of the barley harvest."
    },
    "Deuteronomy 7:1-2": {
        KJV: "1 When the Lord thy God shall bring thee into the land whither thou goest to possess it, and hath cast out many nations before thee, the Hittites, and the Girgashites, and the Amorites, and the Canaanites, and the Perizzites, and the Hivites, and the Jebusites, seven nations greater and mightier than thou; 2 And when the Lord thy God shall deliver them before thee; thou shalt smite them, and utterly destroy them; thou shalt make no covenant with them, nor shew mercy unto them:",
        NKJV: "1 When the Lord your God brings you into the land which you go to possess, and has cast out many nations before you—the Hittites, the Girgashites, the Amorites, the Canaanites, the Perizzites, the Hivites, and the Jebusites, seven nations greater and mightier than you—2 and when the Lord your God delivers them over to you and you defeat them, you shall utterly destroy them. You shall make no covenant with them nor show mercy to them.",
        NIV: "1 When the Lord your God brings you into the land you are entering to possess, and drives out before you many nations—the Hittites, Girgashites, Amorites, Canaanites, Perizzites, Hivites and Jebusites, seven nations larger and stronger than you—2 and when the Lord your God has delivered them over to you and you have defeated them, then you must destroy them totally. Make no treaty with them, and show them no mercy.",
        ESV: "1 When the Lord your God brings you into the land that you are entering to possess, and clears away many nations before you—the Hittites, the Girgashites, the Amorites, the Canaanites, the Perizzites, the Hivites, and the Jebusites, seven nations more numerous and mightier than you—2 and when the Lord your God gives them over to you, and you defeat them, then you must devote them to complete destruction. You shall make no covenant with them and show them no mercy.",
        AMP: "1 When the Lord your God brings you into the land you are about to enter to possess, and He drives out many nations before you—the Hittites, Girgashites, Amorites, Canaanites, Perizzites, Hivites, and Jebusites, seven nations more numerous and stronger than you—2 and when the Lord your God delivers them over to you and you defeat them, you shall utterly destroy them. You shall make no covenant with them and show them no mercy.",
        NLT: "1 When the Lord your God brings you into the land you are about to enter and possess, and he drives out many nations before you—the Hittites, Girgashites, Amorites, Canaanites, Perizzites, Hivites, and Jebusites, seven nations larger and stronger than you—2 and when the Lord your God delivers them over to you, you must completely destroy them. Make no treaties with them and show them no mercy."
    },
};

const quizQuestions = [
    {
        q: "If a covenant carries spiritual weight and is witnessed by God, how might this affect the way people approach agreements in life?",
        a: [
            "They would take covenants more seriously, knowing God oversees them",
            "They would ignore spiritual implications and focus only on personal gain",
            "They would only worry about legal consequences",
            "They would depend on luck rather than discernment"
        ],
        correct: 0
    },
    {
        q: "Considering the Gibeonites’ strategy, what can be inferred about human decision-making when appearances are trusted without verification?",
        a: [
            "Decisions can be misguided if one fails to investigate thoroughly",
            "Trusting appearances always leads to blessings",
            "All agreements are equally safe to accept",
            "God approves all human decisions regardless of caution"
        ],
        correct: 0
    },
    {
        q: "If someone enters a covenant without understanding it, what potential outcome does the lesson suggest might occur?",
        a: [
            "They may face unintended consequences that affect their life",
            "They will automatically prosper",
            "Nothing will change, since covenants are symbolic",
            "They gain advantage over others without effort"
        ],
        correct: 0
    },
    {
        q: "Why might it be important to examine covenants in one’s life, even if they were formed long ago?",
        a: [
            "Because past agreements can influence present circumstances and decisions",
            "Because old covenants are irrelevant",
            "Because only new agreements matter spiritually",
            "Because it is mainly a historical exercise"
        ],
        correct: 0
    },
    {
        q: "How might God’s role as a divine witness in covenants influence how parties behave?",
        a: [
            "It encourages faithfulness and accountability, knowing God oversees every action",
            "It allows parties to act selfishly without concern",
            "It has no effect on behavior",
            "It removes human responsibility entirely"
        ],
        correct: 0
    },
    {
        q: "If a covenant is broken or ignored, what lesson can be drawn regarding its impact on daily life?",
        a: [
            "Even unseen agreements can influence one’s destiny and circumstances",
            "Breaking covenants has no real-world effect",
            "Consequences only matter in legal contexts",
            "Only others are affected, not oneself"
        ],
        correct: 0
    },
    {
        q: "In the context of the lesson, what does the Gibeonites’ interaction with Israel reveal about human perception?",
        a: [
            "That people can be deceived by appearances or incomplete information",
            "That people always make correct judgments",
            "That divine guidance is unnecessary in decision-making",
            "That agreements are trivial in life"
        ],
        correct: 0
    },
    {
        q: "When reflecting on one’s spiritual life, how might prayer and discernment help with covenants?",
        a: [
            "It helps identify ungodly covenants and aligns actions with God’s will",
            "It replaces the need to examine covenants",
            "It only improves social relationships",
            "It has no effect on practical decision-making"
        ],
        correct: 0
    },
    {
        q: "How might understanding covenants affect the way someone approaches challenges or decisions in life?",
        a: [
            "It encourages careful evaluation, honoring God, and avoiding harmful agreements",
            "It leads to fear and inaction",
            "It promotes ignoring past mistakes",
            "It prioritizes worldly gain over spiritual wisdom"
        ],
        correct: 0
    }
];

const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [scriptureDB] = useState<ScriptureDB>(initialScriptureDB);
    const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
    const [bibleVersion, setBibleVersion] = useState<keyof BibleVersions>("KJV");
    const [showVerseModal, setShowVerseModal] = useState(false);
    const [verseLoading, setVerseLoading] = useState(false);
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(50);
    const [showResults, setShowResults] = useState(false);

    // Gamification State
    const [userXp, setUserXp] = useState<number>(() => {
        try {
            const saved = localStorage.getItem("sunday_school_xp");
            return saved ? parseInt(saved, 10) : 150;
        } catch {
            return 150;
        }
    });
    const [confettiActive, setConfettiActive] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);

    // Admin & Lesson Editor State
    const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
    const [adminPinInput, setAdminPinInput] = useState("");
    const CORRECT_ADMIN_PIN = "7777";

    // Attendance Check-In State
    const [isCheckedIn, setIsCheckedIn] = useState(() => {
        return localStorage.getItem("sunday_school_checked_in") === "true";
    });
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [attendanceList, setAttendanceList] = useState<AttendanceEntry[]>([]);

    // Audio Voice Selector State
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>("");
    const [speechRate, setSpeechRate] = useState(1);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Weekly Poll State
    const [pollVoted, setPollVoted] = useState(false);
    const [pollOption, setPollOption] = useState<number | null>(null);

    // Notes & Favorites
    const [notes, setNotes] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem("sunday_school_notes");
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });
    const [currentNote, setCurrentNote] = useState("");
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem("sunday_school_favorites");
            return saved ? JSON.parse(saved) : ["Mark 3:27"];
        } catch {
            return ["Mark 3:27"];
        }
    });
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    // Real-time Chat States
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [userName, setUserName] = useState("User_" + Math.floor(Math.random() * 1000));

    type LessonPoint = {
        title: string;
        content: string;
        scriptures: string[];
    };
    type ContentData = {
        lessonDate: string;
        lessonTitle: string;
        memoryVerse: string;
        memoryVerseRef: string;
        introduction: string;
        aims: string;
        objectives: string;
        lessonIntro: string;
        lessonPoints: LessonPoint[];
        conclusion: string;
    };

    const [contentData, setContentData] = useState<ContentData>(() => {
        try {
            const saved = localStorage.getItem("sunday_school_custom_content");
            if (saved) return JSON.parse(saved);
        } catch {
            // fallback
        }
        return {
            lessonDate: "December 14, 2025",
            lessonTitle: "The Strength of Covenant – Part 1",
            memoryVerse:
                "No man can enter into a strong man's house, and spoil his goods, except he will first bind the strong man; and then he will spoil his house.",
            memoryVerseRef: "Mark 3:27",
            introduction:
                "The word 'covenant' has several definitions. I put it as an agreed form of relationship between two or more parties being witnessed by God. It is beyond an agreement—that is why people employ it whenever something is required above the ordinary. An agreement is flexible, but a covenant is very rigid.",
            aims: "To reveal the implications of covenant since man is surrounded or obliged to surround himself by it.",
            objectives: "To cause man to be mindful of holy covenants and discard evil covenants through Christ.",
            lessonIntro:
                "God had defeated some nations of Canaan by the hands of Israel, leading to an emergency coalition of the nations against Israel. The Gibeonites came to Joshua and the princes of Israel as people from outside Canaan and succeeded in initiating a covenant consequently with the uninquisitive Israel.",
            lessonPoints: [
                {
                    title: "Understanding Covenant",
                    content: "A covenant is a solemn agreement or binding relationship. Unlike ordinary agreements, covenants carry spiritual weight because God witnesses them.",
                    scriptures: [],
                },
                {
                    title: "Lessons from the Gibeonites",
                    content: "The Gibeonites’ strategy teaches us that human perception can be deceived. Israel entered a covenant without proper inquiry.",
                    scriptures: ["Joshua 9:14–19"],
                },
                {
                    title: "Implications of Covenants in Life",
                    content: "Many covenants, whether honored or broken, impact human destiny and living conditions.",
                    scriptures: [],
                },
            ],
            conclusion: "Let's pay proper attention to this lesson because God has your well-being at heart.",
        };
    });

    const handleSaveAdminLesson = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("sunday_school_custom_content", JSON.stringify(contentData));
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 2500);
        alert("✨ Lesson content updated successfully and saved!");
    };

    const addXp = (amount: number) => {
        const updated = userXp + amount;
        setUserXp(updated);
        localStorage.setItem("sunday_school_xp", updated.toString());
    };

    // Load available browser text-to-speech voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                setSelectedVoice(availableVoices[0].name);
            }
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, [selectedVoice]);

    // Load Attendance Records from Supabase
    useEffect(() => {
        const fetchAttendance = async () => {
            const { data, error } = await supabase
                .from("attendance")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(20);
            if (data && !error) {
                setAttendanceList(data);
            }
        };
        fetchAttendance();
    }, []);

    const handleCheckIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const checkData = {
            user_name: userName,
            class_name: contentData.lessonTitle,
        };

        const { error } = await supabase.from("attendance").insert([checkData]);
        if (!error) {
            setIsCheckedIn(true);
            localStorage.setItem("sunday_school_checked_in", "true");
            addXp(30);
            setConfettiActive(true);
            setTimeout(() => setConfettiActive(false), 2500);
            setShowAttendanceModal(false);
            setAttendanceList((prev) => [checkData, ...prev]);
            alert("✅ Attendance logged successfully! +30 Spiritual XP earned!");
        } else {
            setIsCheckedIn(true);
            localStorage.setItem("sunday_school_checked_in", "true");
            addXp(30);
            setShowAttendanceModal(false);
            alert("✅ Attendance marked locally! +30 Spiritual XP earned!");
        }
    };

    // Load Note for Active Tab
    useEffect(() => {
        setCurrentNote(notes[activeTab] || "");
    }, [activeTab, notes]);

    const saveNote = () => {
        const updated = { ...notes, [activeTab]: currentNote };
        setNotes(updated);
        localStorage.setItem("sunday_school_notes", JSON.stringify(updated));
        addXp(25);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 2000);
        alert("✨ Reflection saved! +25 Spiritual XP earned!");
    };

    // PDF / Text Export Function
    const exportNotesAsText = () => {
        const textContent = `
=============================================
LIFE GATE MINISTRIES WORLDWIDE
SUNDAY SCHOOL COMPENDIUM
=============================================
Lesson: ${contentData.lessonTitle}
Date: ${contentData.lessonDate}

MEMORY VERSE:
"${contentData.memoryVerse}" (${contentData.memoryVerseRef})

AIMS:
${contentData.aims}

OBJECTIVES:
${contentData.objectives}

INTRODUCTION:
${contentData.introduction}

MY PERSONAL REFLECTION NOTES (${activeTab}):
${currentNote || "No notes recorded for this section."}
=============================================
        `.trim();

        const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Sunday_School_Notes_${activeTab}.txt`;
        link.click();
        URL.revokeObjectURL(url);
        addXp(20);
        alert("📥 Lesson notes exported successfully! +20 XP");
    };

    // Text-to-Speech Handler with Voice Selection
    const toggleSpeech = (text: string) => {
        if (!window.speechSynthesis) {
            alert("Speech synthesis not supported in your browser.");
            return;
        }
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = speechRate;
            const chosenVoice = voices.find((v) => v.name === selectedVoice);
            if (chosenVoice) utterance.voice = chosenVoice;

            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            addXp(10);
        }
    };

    // Favorite Toggle Handler
    const toggleFavorite = (ref: string) => {
        let updated: string[];
        if (favorites.includes(ref)) {
            updated = favorites.filter((item) => item !== ref);
        } else {
            updated = [...favorites, ref];
            addXp(15);
        }
        setFavorites(updated);
        localStorage.setItem("sunday_school_favorites", JSON.stringify(updated));
    };

    // Supabase Realtime Setup for Chat Messages and Leaderboard
    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: true })
                .limit(50);
            if (data && !error) {
                setChatMessages(data);
            }
        };
        fetchMessages();

        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from("leaderboard")
                .select("*")
                .order("score", { ascending: false })
                .limit(10);
            if (data && !error) {
                setLeaderboard(data);
            }
        };
        fetchLeaderboard();

        const channel = supabase
            .channel("realtime-chat")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload) => {
                    setChatMessages((prev) => [...prev, payload.new as ChatMessage]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const sendChatMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msgData = {
            user_name: userName,
            message: newMessage.trim(),
        };

        const { error } = await supabase.from("messages").insert([msgData]);
        if (!error) {
            setNewMessage("");
            addXp(10);
        } else {
            console.error("Error sending message:", error);
            setChatMessages((prev) => [...prev, { ...msgData, created_at: new Date().toISOString() }]);
            setNewMessage("");
        }
    };

    const formatScriptureText = (text: string) => {
        const parts = text.split(/(\d+)/);
        return parts.map((part, index) => {
            if (/^\d+$/.test(part)) {
                return (
                    <strong key={index} className={`font-bold ${darkMode ? "text-amber-400" : "text-amber-600"}`}>
                        {part}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setAppLoading(false), 500);
                    return 100;
                }
                return prev + 15;
            });
        }, 120);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setDarkMode(!darkMode);
    const adjustFontSize = (delta: number) =>
        setFontSize((prev) => Math.min(Math.max(prev + delta, 10), 30));
    const handleTabChange = (tab: string) => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
        setLoading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setLoading(false);
        }, 200);
    };

    const showBibleVersions = (reference: string) => {
        setSelectedVerse(reference);
        setShowVerseModal(true);
        setVerseLoading(true);
        setTimeout(() => setVerseLoading(false), 400);
    };

    const changeBibleVersion = (version: keyof BibleVersions) => {
        setVerseLoading(true);
        setTimeout(() => {
            setBibleVersion(version);
            setVerseLoading(false);
        }, 300);
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (quizActive && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [quizActive, timeLeft, showResults]);

    const startQuiz = () => {
        setQuizActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(50);
        setShowResults(false);
    };

    const checkAnswer = (choice: number) => {
        if (!quizActive || showResults) return;
        const correct = quizQuestions[currentQuestion].correct === choice;
        const timeBonus = Math.floor(timeLeft / 10);
        const points = correct ? 10 + timeBonus : 0;
        if (correct) {
            setScore((prev) => prev + points);
            addXp(15);
        }
        if (currentQuestion < quizQuestions.length - 1) {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
        } else {
            setTimeout(() => endQuiz(), 500);
        }
    };

    const endQuiz = async () => {
        setQuizActive(false);
        setShowResults(true);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 3000);
        addXp(50);

        const scoreData = { user_name: userName, score: score > 0 ? score : 10 };
        const { error } = await supabase.from("leaderboard").insert([scoreData]);
        if (!error) {
            setLeaderboard((prev) => [...prev, scoreData].sort((a, b) => b.score - a.score));
        }
    };

    const PAYSTACK_PUBLIC_KEY = "pk_test_bed97038ebcf74b30219ed0500cfffc6e80948f1";
    const PAYMENT_AMOUNT = 500000;

    const handlePaystackSuccess = (reference: unknown) => {
        console.log("Payment successful:", reference);
        setIsPaid(true);
        setShowPaymentGate(false);
        addXp(200);
    };

    const initializePaystack = () => {
        if (!window.PaystackPop) {
            alert("Paystack script not loaded!");
            return;
        }
        const paystack = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: "user@example.com",
            amount: PAYMENT_AMOUNT,
            currency: "NGN",
            reference: "SSA_" + Math.floor(Math.random() * 1000000000 + 1),
            onClose: () => console.log("Payment closed"),
            callback: (transaction: PaystackResponse) => handlePaystackSuccess(transaction),
        });
        paystack.openIframe();
    };

    const handleFreePlan = () => {
        setShowPaymentGate(false);
        setIsPaid(false);
    };

    const themeClasses = darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900";

    if (appLoading) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50 p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,transparent_100%)]"></div>
                <div className="text-center relative z-10 w-full max-w-sm px-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl shadow-blue-500/40 flex items-center justify-center animate-bounce mb-6 sm:mb-8">
                        <img src={logo} alt="Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl" />
                    </div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-blue-400 font-bold block">Life Gate Ministries Worldwide</span>
                    <h1 className="text-xl sm:text-3xl font-black text-white mt-1 mb-6">Sunday School Experience</h1>
                    <div className="w-full max-w-[240px] mx-auto bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700 shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-slate-400 mt-3 text-[11px] sm:text-xs font-mono tracking-wide">
                        Preparing Spiritual Portal... {loadingProgress}%
                    </p>
                </div>
            </div>
        );
    }

    if (showPaymentGate) {
        return (
            <div className={`min-h-screen ${themeClasses} flex items-center justify-center p-3 sm:p-6 relative overflow-x-hidden`} style={{ fontSize: `${fontSize}px` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.1)_0,transparent_50%)] pointer-events-none"></div>
                <div className="max-w-4xl w-full relative z-10 py-8 sm:py-12">
                    <div className="text-center mb-8 sm:mb-10 px-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl p-1 shadow-2xl flex items-center justify-center">
                            <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                        </div>
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-blue-500 font-bold">Life Gate Ministries Worldwide</span>
                        <h1 className="text-2xl sm:text-4xl font-black mt-1 mb-2 tracking-tight">Sunday School Portal</h1>
                        <p className="text-slate-500 text-xs sm:text-sm px-2">
                            Choose your session tier for <strong className={darkMode ? "text-white" : "text-slate-900"}>{contentData.lessonTitle}</strong>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
                        <div className={`${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"} backdrop-blur-xl border rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300`}>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold">Standard Access</h3>
                                    <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800 text-slate-300"><Unlock size={18} /></div>
                                </div>
                                <div className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">₦0</div>
                                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
                                    <li className="flex items-center gap-2.5 sm:gap-3">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" /> Full lesson text & audio reader
                                    </li>
                                    <li className="flex items-center gap-2.5 sm:gap-3">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" /> Real-time community chat room
                                    </li>
                                </ul>
                            </div>
                            <button onClick={handleFreePlan} className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold text-xs sm:text-sm transition shadow-lg">
                                Enter Free Session
                            </button>
                        </div>

                        <div className={`relative ${darkMode ? "bg-gradient-to-b from-blue-950/40 via-slate-900/80 to-slate-900 border-blue-500/30 text-slate-100" : "bg-gradient-to-b from-blue-50 via-white to-white border-blue-200 text-slate-900"} backdrop-blur-xl border rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden hover:border-blue-500/50 transition-all duration-300`}>
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-md">
                                Recommended
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold">Premium All-Access</h3>
                                    <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/20 text-blue-500 border border-blue-500/30"><Lock size={18} /></div>
                                </div>
                                <div className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">₦5,000</div>
                                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
                                    <li className="flex items-center gap-2.5 sm:gap-3">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" /> Real-time multi-user discussion room
                                    </li>
                                    <li className="flex items-center gap-2.5 sm:gap-3">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" /> Scripture database & Quiz Leaderboard
                                    </li>
                                </ul>
                            </div>
                            <button onClick={initializePaystack} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-semibold text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                                <Sparkles size={16} /> Unlock Premium (₦5,000)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className={`min-h-screen ${themeClasses} transition-all duration-300 relative overflow-x-hidden`}
            style={{ fontSize: `${fontSize}px` }}
        >
            {/* Confetti Celebration Banner */}
            {confettiActive && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center px-4">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 py-4 rounded-3xl shadow-2xl text-base sm:text-lg font-black animate-bounce tracking-wide border border-white/25 text-center">
                        🎉 Splendid Job! Spiritual Breakthrough Unlocked! 🚀
                    </div>
                </div>
            )}

            <Header
                logo={logo}
                contentData={contentData}
                fontSize={fontSize}
                adjustFontSize={adjustFontSize}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
            />

            <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl relative z-10">
                
                {/* Gamified Stat Bar & Check-In Button */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div 
                        onClick={() => setShowAchievements(true)} 
                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer hover:border-blue-500 transition ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
                    >
                        <div className="p-2 bg-amber-500/20 text-amber-500 rounded-xl"><Zap size={18} /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Spiritual XP</span>
                            <span className="font-black text-sm text-amber-500">{userXp} XP (Badges)</span>
                        </div>
                    </div>
                    
                    {/* Attendance Check-In Widget Button */}
                    <button
                        onClick={() => setShowAttendanceModal(true)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition hover:border-blue-500 ${isCheckedIn ? (darkMode ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-emerald-50 border-emerald-300 text-emerald-800") : darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 shadow-sm"}`}
                    >
                        <div className={`p-2 rounded-xl shrink-0 ${isCheckedIn ? "bg-emerald-500 text-white" : "bg-blue-500/20 text-blue-400"}`}>
                            <CheckSquare size={18} />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance</span>
                            <span className="font-black text-xs">{isCheckedIn ? "Checked In! ✓" : "Click to Check In"}</span>
                        </div>
                    </button>

                    <div className={`p-3 rounded-2xl border flex items-center gap-3 ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="p-2 bg-blue-500/20 text-blue-500 rounded-xl"><Heart size={18} /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Saved Verses</span>
                            <span className="font-black text-sm text-blue-500">{favorites.length} Verses</span>
                        </div>
                    </div>
                    <button
                        onClick={exportNotesAsText}
                        className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition hover:border-blue-500 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 shadow-sm text-slate-900"}`}
                        title="Download Lesson Notes & Reflections"
                    >
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl shrink-0"><Download size={18} /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Export Notes</span>
                            <span className="font-black text-xs text-purple-400">Download .TXT</span>
                        </div>
                    </button>
                </div>

                {/* Verse of the Day Banner */}
                <div className={`mb-6 p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${darkMode ? "bg-blue-950/30 border-blue-500/30 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow shrink-0 mt-0.5 sm:mt-0"><Sparkles size={18} /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500 block">Verse of the Day ({contentData.memoryVerseRef})</span>
                            <p className="text-[0.9em] italic">"{contentData.memoryVerse}"</p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto justify-end shrink-0">
                        <button
                            onClick={() => showBibleVersions(contentData.memoryVerseRef)}
                            className="flex-1 md:flex-initial px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow transition text-center"
                        >
                            Compare Versions
                        </button>
                        <button
                            onClick={() => toggleFavorite(contentData.memoryVerseRef)}
                            className={`p-2 rounded-xl border transition ${favorites.includes(contentData.memoryVerseRef) ? "bg-amber-500 text-white border-amber-600" : darkMode ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-white border-slate-300 text-slate-700"}`}
                            title="Bookmark Verse"
                        >
                            {favorites.includes(contentData.memoryVerseRef) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                        </button>
                    </div>
                </div>

                <div className="text-center mb-6 sm:mb-8 px-2">
                    <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 ${darkMode ? "bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent" : "text-slate-900"}`}>
                        {contentData.lessonTitle}
                    </h2>
                    <p className={`${darkMode ? "text-slate-400" : "text-slate-600"} text-xs sm:text-sm max-w-xl mx-auto`}>
                        Life Gate Ministries Worldwide Sunday School Compendium
                    </p>
                </div>

                {/* Navigation Tabs (Memorize and Prayer Points Removed) */}
                <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center px-1">
                    {[
                        { id: "intro", label: "Introduction", icon: Compass },
                        { id: "lesson", label: "Lesson Outlines", icon: BookOpen },
                        { id: "conclusion", label: "Conclusion", icon: Shield },
                        { id: "quiz", label: "Speed Quiz", icon: Award },
                        { id: "chat", label: "Live Discussion", icon: MessageSquare },
                        { id: "admin", label: "Admin Editor", icon: Settings },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm shrink-0 border ${
                                    isActive
                                        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-105"
                                        : darkMode
                                        ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                                }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className={`rounded-3xl border shadow-2xl p-4 sm:p-6 md:p-10 backdrop-blur-xl transition-all duration-300 ${
                        darkMode ? "bg-slate-900/80 border-slate-800/80 text-slate-100 shadow-blue-950/20" : "bg-white border-slate-200 text-slate-900 shadow-xl"
                    }`}>
                        
                        {/* Audio Reader Control Bar with Voice & Speed Selectors */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
                            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                                <span className="text-[11px] sm:text-xs uppercase font-bold text-blue-500 tracking-wider">Audio Reader:</span>
                                <select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    className={`text-xs px-2.5 py-1.5 rounded-xl border max-w-[180px] sm:max-w-[220px] truncate ${darkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
                                >
                                    {voices.map((v, i) => (
                                        <option key={i} value={v.name}>
                                            {v.name} ({v.lang})
                                        </option>
                                    ))}
                                </select>
                                <select 
                                    value={speechRate}
                                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                    className={`text-xs px-2 py-1.5 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
                                >
                                    <option value={0.75}>0.75x</option>
                                    <option value={1}>1.0x</option>
                                    <option value={1.25}>1.25x</option>
                                </select>
                            </div>
                            <button
                                onClick={() => toggleSpeech(
                                    activeTab === "intro" ? `${contentData.introduction}. Aims: ${contentData.aims}. Objectives: ${contentData.objectives}` :
                                    activeTab === "lesson" ? contentData.lessonIntro :
                                    activeTab === "conclusion" ? contentData.conclusion :
                                    "Please check out the live discussion or quiz."
                                )}
                                className={`w-full lg:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow ${
                                    isSpeaking 
                                        ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse" 
                                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                                }`}
                            >
                                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                {isSpeaking ? "Stop Reading" : "Listen to Section"}
                            </button>
                        </div>

                        {/* INTRODUCTION TAB */}
                        {activeTab === "intro" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
                                <div className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? "bg-blue-950/20 border-blue-500/20 text-slate-100" : "bg-blue-50 border-blue-200 text-slate-900"}`}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-500 flex items-center gap-2">
                                            <BookOpen size={16} /> Memory Verse
                                        </h3>
                                        <button
                                            onClick={() => showBibleVersions(contentData.memoryVerseRef)}
                                            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow text-center"
                                        >
                                            Read {contentData.memoryVerseRef}
                                        </button>
                                    </div>
                                    <blockquote className={`text-base sm:text-lg md:text-xl font-medium italic leading-relaxed ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                                        "{contentData.memoryVerse}"
                                    </blockquote>
                                </div>

                                {/* Aims & Objectives Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className={`p-4 sm:p-5 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-500 flex items-center gap-2">
                                            <Target size={16} /> Aim
                                        </h4>
                                        <p className="text-[0.95em] leading-relaxed">{contentData.aims}</p>
                                    </div>
                                    <div className={`p-4 sm:p-5 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-500 flex items-center gap-2">
                                            <Sparkles size={16} /> Objective
                                        </h4>
                                        <p className="text-[0.95em] leading-relaxed">{contentData.objectives}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Introduction Overview</h4>
                                    <p className="text-[1em] leading-relaxed">
                                        {contentData.introduction}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* LESSON TAB */}
                        {activeTab === "lesson" && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h3 className="text-lg sm:text-xl font-bold mb-4">Lesson Outlines & Breakdown</h3>
                                <p className="text-[1em] leading-relaxed mb-6">{contentData.lessonIntro}</p>
                                <div className="space-y-4">
                                    {contentData.lessonPoints.map((section, idx) => (
                                        <div key={idx} className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-900"}`}>
                                            <h4 className="text-base sm:text-lg font-bold text-blue-500 mb-2">
                                                {idx + 1}. {section.title}
                                            </h4>
                                            <p className="text-[1em] leading-relaxed">{section.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CONCLUSION TAB */}
                        {activeTab === "conclusion" && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h3 className="text-lg sm:text-xl font-bold mb-4">Conclusion</h3>
                                <div className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? "bg-indigo-950/20 border-indigo-500/20 text-slate-200" : "bg-indigo-50 border-indigo-200 text-slate-800"}`}>
                                    <p className="text-[1em] leading-relaxed italic">
                                        "{contentData.conclusion}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* QUIZ TAB */}
                        {activeTab === "quiz" && (
                            <div className="space-y-6 animate-in fade-in duration-300 text-center py-4">
                                {!quizActive && !showResults && (
                                    <div className="max-w-md mx-auto space-y-4">
                                        <Award size={32} className="mx-auto text-amber-500" />
                                        <h3 className="text-xl sm:text-2xl font-bold">Speed Quiz Challenge</h3>
                                        <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Test your mastery of the covenant principles and earn +50 XP!</p>
                                        <button onClick={startQuiz} className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 transition">
                                            Start Challenge
                                        </button>
                                        
                                        {/* Leaderboard Section */}
                                        <div className="mt-8 pt-6 border-t border-slate-700/40 text-left">
                                            <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
                                                <Trophy size={16} className="text-amber-500" /> Congregation Leaderboard
                                            </h4>
                                            <div className={`rounded-xl p-3 border ${darkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"} space-y-2 max-h-40 overflow-y-auto`}>
                                                {leaderboard.length === 0 ? (
                                                    <p className="text-xs text-slate-400 text-center py-2">No scores recorded yet. Be the first!</p>
                                                ) : (
                                                    leaderboard.map((entry, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-xs">
                                                            <span className="font-semibold flex items-center gap-2">
                                                                <Star size={12} className="text-amber-500" /> {entry.user_name}
                                                            </span>
                                                            <span className="font-mono font-bold text-blue-500">{entry.score} pts</span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {quizActive && !showResults && (
                                    <div className="max-w-xl mx-auto text-left space-y-6">
                                        <div className={`flex justify-between items-center text-xs font-mono border-b pb-3 ${darkMode ? "text-slate-400 border-slate-800" : "text-slate-500 border-slate-200"}`}>
                                            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                            <span className="text-amber-500 font-bold">⏱ {timeLeft}s remaining</span>
                                        </div>
                                        <h4 className={`text-sm sm:text-base md:text-lg font-bold ${darkMode ? "text-slate-200" : "text-slate-900"}`}>
                                            {quizQuestions[currentQuestion].q}
                                        </h4>
                                        <div className="grid gap-3">
                                            {quizQuestions[currentQuestion].a.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => checkAnswer(idx)}
                                                    className={`p-3.5 sm:p-4 rounded-2xl border text-left text-[1em] font-medium transition ${
                                                        darkMode
                                                            ? "bg-slate-800/60 hover:bg-blue-600/20 border-slate-700 text-slate-200"
                                                            : "bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800"
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {showResults && (
                                    <div className="max-w-md mx-auto space-y-4">
                                        <Award size={48} className="mx-auto text-amber-500 animate-bounce" />
                                        <h3 className="text-xl sm:text-2xl font-bold">Challenge Completed!</h3>
                                        <div className={`p-6 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                            <div className="text-3xl sm:text-4xl font-black text-blue-500 mb-1">{score}</div>
                                            <p className={`text-xs uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Final Points Earned & Saved (+50 XP)</p>
                                        </div>
                                        <button onClick={startQuiz} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow">Try Again</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* LIVE DISCUSSION CHAT & WEEKLY POLL TAB */}
                        {activeTab === "chat" && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Weekly Interactive Poll Card */}
                                <div className={`p-4 sm:p-5 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-700" : "bg-blue-50/50 border-blue-200"}`}>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-2 mb-2">
                                        <BarChart2 size={16} /> Weekly Congregation Poll
                                    </h4>
                                    <p className="text-xs font-medium mb-3">How confident do you feel examining covenants in your life this week?</p>
                                    {!pollVoted ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            <button onClick={() => { setPollVoted(true); setPollOption(1); addXp(10); }} className={`p-2.5 rounded-xl text-xs font-semibold border transition ${darkMode ? "bg-slate-800 hover:bg-blue-600/20 border-slate-700 text-slate-200" : "bg-white hover:bg-blue-100 border-slate-300 text-slate-800"}`}>Very Confident</button>
                                            <button onClick={() => { setPollVoted(true); setPollOption(2); addXp(10); }} className={`p-2.5 rounded-xl text-xs font-semibold border transition ${darkMode ? "bg-slate-800 hover:bg-blue-600/20 border-slate-700 text-slate-200" : "bg-white hover:bg-blue-100 border-slate-300 text-slate-800"}`}>Growing in Grace</button>
                                            <button onClick={() => { setPollVoted(true); setPollOption(3); addXp(10); }} className={`p-2.5 rounded-xl text-xs font-semibold border transition ${darkMode ? "bg-slate-800 hover:bg-blue-600/20 border-slate-700 text-slate-200" : "bg-white hover:bg-blue-100 border-slate-300 text-slate-800"}`}>Need Prayer/Counsel</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between font-bold text-blue-500"><span>Thank you for voting! (+10 XP)</span><span>Total: 65 votes</span></div>
                                            <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                                <div className="bg-blue-600 h-full rounded-full" style={{ width: pollOption === 1 ? "65%" : pollOption === 2 ? "28%" : "7%" }}></div>
                                            </div>
                                            <p className="text-[11px] text-slate-400 italic">Results update live in real-time with the congregation.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                                    <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                        <MessageSquare className="text-blue-500 shrink-0" size={20} /> Live Multi-User Discussion
                                    </h3>
                                    <div className={`flex items-center gap-2 text-xs w-full sm:w-auto justify-between sm:justify-start ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                        <span>Display Name:</span>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className={`px-2 py-1 rounded border text-xs w-28 ${darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-900 border-slate-300"}`}
                                        />
                                    </div>
                                </div>
                                <div className={`h-64 sm:h-72 overflow-y-auto p-3 sm:p-4 rounded-2xl border ${darkMode ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} space-y-3 flex flex-col`}>
                                    {chatMessages.length === 0 ? (
                                        <p className="text-center text-slate-400 text-xs my-auto">No messages yet. Be the first to share an insight!</p>
                                    ) : (
                                        chatMessages.map((msg, i) => (
                                            <div key={i} className={`p-3 rounded-xl max-w-[85%] sm:max-w-[80%] text-[1em] ${
                                                msg.user_name === userName 
                                                    ? "bg-blue-600/20 border border-blue-500/30 ml-auto text-right text-blue-400" 
                                                    : darkMode ? "bg-slate-800/60 border border-slate-700 mr-auto text-slate-200" : "bg-white border border-slate-200 mr-auto text-slate-800 shadow-sm"
                                            }`}>
                                                <div className="font-bold text-[0.85em] text-blue-500 mb-1">{msg.user_name}</div>
                                                <div>{msg.message}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <form onSubmit={sendChatMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message or insight..."
                                        className={`flex-1 px-3 sm:px-4 py-3 rounded-xl border text-[1em] focus:outline-none focus:border-blue-500 ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900 shadow-sm"}`}
                                    />
                                    <button type="submit" className="px-4 sm:px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow shrink-0">
                                        <Send size={14} /> <span className="hidden sm:inline">Send</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* TEACHER ADMIN & LESSON EDITOR TAB */}
                        {activeTab === "admin" && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {!isAdminUnlocked ? (
                                    <div className="max-w-md mx-auto text-center space-y-4 py-6">
                                        <Lock size={36} className="mx-auto text-blue-500 mb-2" />
                                        <h3 className="text-xl font-bold">Teacher Admin Portal</h3>
                                        <p className="text-xs text-slate-400">Enter Admin PIN (Default: <code className="text-amber-400 font-mono">7777</code>) to edit lesson content on the fly.</p>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            if (adminPinInput === CORRECT_ADMIN_PIN) {
                                                setIsAdminUnlocked(true);
                                            } else {
                                                alert("❌ Incorrect PIN! Try 7777.");
                                            }
                                        }} className="space-y-3">
                                            <input
                                                type="password"
                                                value={adminPinInput}
                                                onChange={(e) => setAdminPinInput(e.target.value)}
                                                placeholder="Enter Admin PIN..."
                                                maxLength={4}
                                                className={`w-full px-4 py-3 rounded-xl border text-center text-lg tracking-widest ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                            />
                                            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow">
                                                Unlock Admin Editor
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSaveAdminLesson} className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                                            <h3 className="text-lg font-bold flex items-center gap-2">
                                                <Settings className="text-blue-500" size={20} /> Live Lesson Content Editor
                                            </h3>
                                            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow">
                                                <Save size={14} /> Save Lesson Updates
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Lesson Title</label>
                                                <input
                                                    type="text"
                                                    value={contentData.lessonTitle}
                                                    onChange={(e) => setContentData({ ...contentData, lessonTitle: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Lesson Date</label>
                                                <input
                                                    type="text"
                                                    value={contentData.lessonDate}
                                                    onChange={(e) => setContentData({ ...contentData, lessonDate: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Memory Verse Text</label>
                                                <input
                                                    type="text"
                                                    value={contentData.memoryVerse}
                                                    onChange={(e) => setContentData({ ...contentData, memoryVerse: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Memory Verse Ref</label>
                                                <input
                                                    type="text"
                                                    value={contentData.memoryVerseRef}
                                                    onChange={(e) => setContentData({ ...contentData, memoryVerseRef: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Introduction Overview</label>
                                            <textarea
                                                rows={3}
                                                value={contentData.introduction}
                                                onChange={(e) => setContentData({ ...contentData, introduction: e.target.value })}
                                                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                            ></textarea>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Aim</label>
                                                <textarea
                                                    rows={2}
                                                    value={contentData.aims}
                                                    onChange={(e) => setContentData({ ...contentData, aims: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Objective</label>
                                                <textarea
                                                    rows={2}
                                                    value={contentData.objectives}
                                                    onChange={(e) => setContentData({ ...contentData, objectives: e.target.value })}
                                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Personal Reflection Notes Box */}
                        <div className="mt-8 pt-6 border-t border-slate-700/40">
                            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-blue-500">
                                <FileText size={16} /> My Personal Reflection Notes ({activeTab})
                            </h4>
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Type your personal notes, inspirations, or questions here..."
                                rows={3}
                                className={`w-full p-4 rounded-2xl border text-[1em] focus:outline-none focus:border-blue-500 mb-2 ${darkMode ? "bg-slate-950/60 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                            ></textarea>
                            <button
                                onClick={saveNote}
                                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow transition text-center"
                            >
                                Save Note Locally (+25 XP)
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Attendance Check-In Modal */}
            {showAttendanceModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50" onClick={() => setShowAttendanceModal(false)}>
                    <div className={`rounded-3xl shadow-2xl w-[95%] sm:max-w-md overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <div className={`p-5 border-b flex justify-between items-center ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <Users className="text-blue-500" size={20} /> Sunday School Check-In
                            </h3>
                            <button onClick={() => setShowAttendanceModal(false)} className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"}`}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-xs text-slate-400">Mark your presence for today's session to log your attendance with Life Gate Ministries and earn +30 XP.</p>
                            <form onSubmit={handleCheckIn} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Your Full Name / ID</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border text-sm ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                    />
                                </div>
                                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 transition">
                                    Check In Now (+30 XP)
                                </button>
                            </form>

                            {/* Recent Check-Ins List */}
                            <div className="mt-6 pt-4 border-t border-slate-700/40">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Recent Congregation Check-Ins</h4>
                                <div className={`max-h-36 overflow-y-auto p-2 rounded-xl border space-y-2 ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                    {attendanceList.length === 0 ? (
                                        <p className="text-xs text-slate-500 text-center py-2">No check-ins yet today.</p>
                                    ) : (
                                        attendanceList.map((att, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-xs py-1 px-2 border-b border-slate-800/40 last:border-0">
                                                <span className="font-semibold flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /> {att.user_name}</span>
                                                <span className="text-[10px] text-slate-400">Present</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Achievements Modal */}
            {showAchievements && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50" onClick={() => setShowAchievements(false)}>
                    <div className={`rounded-3xl shadow-2xl w-[95%] sm:max-w-md overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <div className={`p-5 border-b flex justify-between items-center ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <Medal className="text-amber-500" size={20} /> Spiritual Milestones & Badges
                            </h3>
                            <button onClick={() => setShowAchievements(false)} className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"}`}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${userXp >= 100 ? (darkMode ? "bg-amber-950/20 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-900") : "opacity-50"}`}>
                                <div className="p-3 bg-amber-500 text-white rounded-xl shadow"><Trophy size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-sm">Covenant Scholar</h4>
                                    <p className="text-xs opacity-80">Achieve 100+ Spiritual XP (Unlocked!)</p>
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${userXp >= 250 ? (darkMode ? "bg-purple-950/20 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900") : "opacity-50"}`}>
                                <div className="p-3 bg-purple-600 text-white rounded-xl shadow"><Sparkles size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-sm">Dedicated Intercessor</h4>
                                    <p className="text-xs opacity-80">Achieve 250+ Spiritual XP ({userXp}/250 XP)</p>
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${favorites.length >= 5 ? (darkMode ? "bg-blue-950/20 border-blue-500/30 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-900") : "opacity-50"}`}>
                                <div className="p-3 bg-blue-600 text-white rounded-xl shadow"><Heart size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-sm">Scripture Meditator</h4>
                                    <p className="text-xs opacity-80">Bookmark 5+ favorite scriptures ({favorites.length}/5)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bible Verse Reader Modal */}
            {showVerseModal && selectedVerse && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50" onClick={() => setShowVerseModal(false)}>
                    <div className={`rounded-3xl shadow-2xl w-[95%] sm:max-w-2xl overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <div className={`p-4 sm:p-5 border-b flex justify-between items-center ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm sm:text-base font-bold">{selectedVerse}</h3>
                                <button
                                    onClick={() => toggleFavorite(selectedVerse)}
                                    className={`p-1.5 rounded-lg border transition ${favorites.includes(selectedVerse) ? "bg-amber-500 text-white border-amber-600" : darkMode ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-white border-slate-300 text-slate-700"}`}
                                >
                                    {favorites.includes(selectedVerse) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                            </div>
                            <button onClick={() => setShowVerseModal(false)} className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"}`}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className={`flex gap-1.5 p-2 sm:p-3 border-b overflow-x-auto ${darkMode ? "border-slate-800 bg-slate-950/40" : "border-slate-200 bg-slate-50"}`}>
                            {(["KJV", "NKJV", "NIV", "ESV", "AMP", "NLT"] as const).map((version) => (
                                <button
                                    key={version}
                                    onClick={() => changeBibleVersion(version)}
                                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition shrink-0 ${bibleVersion === version ? "bg-blue-600 text-white shadow" : darkMode ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"}`}
                                >
                                    {version}
                                </button>
                            ))}
                        </div>
                        <div className="p-4 sm:p-6 max-h-[50vh] overflow-y-auto">
                            {verseLoading ? (
                                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div></div>
                            ) : (
                                <div className="text-[1em] leading-relaxed">
                                    {formatScriptureText(scriptureDB[selectedVerse]?.[bibleVersion] || "")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SundaySchoolApp;