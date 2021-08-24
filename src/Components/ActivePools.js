import React from 'react';

const ActivePools = () => {
    return (
        <div class="ui card">
            <div class="content">
            <h2 class="ui header">Most Active Pools</h2>
                <table class="ui selectable inverted table">
                <thead>
                    <tr>
                    <th>Asset</th>
                    <th>Leverage</th>
                    <th>Volume</th>
                    <th class="right aligned">TLV</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>MIR</td>
                    <td>3x</td>
                    <td>30k</td>
                    <td class="right aligned">130,023 UST</td>
                    </tr>
                    <tr>
                    <td>mTSLA</td>
                    <td>2x</td>
                    <td>13k</td>
                    <td class="right aligned">31,235 UST</td>
                    </tr>
                    <tr>
                    <td>mAPPL</td>
                    <td>3x</td>
                    <td>40k</td>
                    <td class="right aligned">200,123 UST</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ActivePools;