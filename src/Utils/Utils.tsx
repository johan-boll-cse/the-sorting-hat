export const SORTS : String[] = ["Selection", "Bubble", "Merge", "Quick"];
export const HILIGHTS : String[] = ["Current Index", "No Swap", "", "Pivot"];
// The SPEEDS related to the SPEED_NUMBERS below
export const SPEEDS : String[] = ["Slowest", "Slower", "Slow", "Normal", "Fast", "Faster", "Fastest"];
export const SPEED_NUMBERS : number[] = [2000, 500, 100, 50, 20, 5, 1];
export const INIT_COLOR = 'rgb(179,149,0)';    // Dark gold
export const CUR_COLOR = 'rgb(139,0,0)';       // Dark red
export const SWAP_COLOR = 'rgb(0,48,143)';     // Dark blue
export const HI_COLOR = 'rgb(255, 255, 255)'   // White
export const SORTED_COLOR = 'rgb(0,77,26)';    // Dark green
export const BAR_HEIGHT = 4;
export const MAX_VAL = 99;
export const MIN_VAL = 10;
export const DEFAULT_NUM_BARS = 40;
export const DEFAULT_SPEED = 4;
// Runtime -- In HTML to allow for superscripts
// Space, Stable, Difficulty as strings associated to their colors
export const PROPERTIES_RUNTIME : any[] = [
    <div className="Flex-Row-Center">
        <div className="Flex-Col-Center">
            <p className = "Top-Label">Worst</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
        <div className="Flex-Col-Center MarginL30">
            <p className = "Top-Label">Average</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
        <div className="Flex-Col-Center MarginL30">
            <p className = "Top-Label">Best</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
    </div>,
    <div className="Flex-Row-Center">
        <div className="Flex-Col-Center">
            <p className = "Top-Label">Worst</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
        <div className="Flex-Col-Center MarginL30">
            <p className = "Top-Label">Average</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
        <div className="Flex-Col-Center MarginL30">
            <p className = "Top-Label">Best</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
    </div>,
    <div className="Flex-Row-Center">
        <div className="Flex-Col-Center">
            <p className = "Top-Label">Worst</p>
            <p className = "Normal Bottom-Label Yellow">O(nlog(n))</p>
        </div>
        <div className="Flex-Col-Center MarginL15">
            <p className = "Top-Label">Average</p>
            <p className = "Normal Bottom-Label Yellow">O(nlog(n))</p>
        </div>
        <div className="Flex-Col-Center MarginL15">
            <p className = "Top-Label">Best</p>
            <p className = "Normal Bottom-Label Yellow">O(nlog(n))</p>
        </div>
    </div>,
    <div className="Flex-Row-Center">
        <div className="Flex-Col-Center">
            <p className = "Top-Label">Worst</p>
            <p className = "Sup Bottom-Label Red">O(n<sup>2</sup>)</p>
        </div>
        <div className="Flex-Col-Center MarginL15">
            <p className = "Top-Label">Average</p>
            <p className = "Normal Bottom-Label Yellow">O(nlog(n))</p>
        </div>
        <div className="Flex-Col-Center MarginL15">
            <p className = "Top-Label">Best</p>
            <p className = "Normal Bottom-Label Yellow">O(nlog(n))</p>
        </div>
    </div>]
export const PROPERTIES_SPACE : String[] = ["O(1)", "O(1)", "O(n)", "O(1)"]
export const SPACE_COLOR : any[] = ["Green", "Green", "Red", "Green"]
export const PROPERTIES_STABLE : String[] = ["Yes", "Yes", "Yes", "No"]
export const STABLE_COLOR : any[] = ["Green", "Green", "Green", "Red"]
export const PROPERTIES_DIFFICULTY : String[] = ["Easy", "Medium", "Hard", "Hard"]
export const DIFFICULTY_COLOR : any[] = ["Green", "Yellow", "Red", "Red"]